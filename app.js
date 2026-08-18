/**
 * Form Interaction & Email Delivery Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const hasWebsiteInput = document.getElementById('has-website');
  const labelYes = document.getElementById('label-has-website-yes');
  const labelNo = document.getElementById('label-has-website-no');
  const urlWrapper = document.getElementById('website-url-wrapper');
  const urlInput = document.getElementById('website-url');
  const companyInput = document.getElementById('company-name');
  const inquiryTextarea = document.getElementById('inquiry-content');
  const submitBtn = document.getElementById('submit-btn');

  // 1. Toggle "ある" / "ない"
  labelYes.addEventListener('click', () => {
    labelYes.classList.add('active');
    labelNo.classList.remove('active');
    hasWebsiteInput.value = 'ある';
    urlWrapper.classList.remove('hidden-section');
    urlInput.focus();
  });

  labelNo.addEventListener('click', () => {
    labelNo.classList.add('active');
    labelYes.classList.remove('active');
    hasWebsiteInput.value = 'ない';
    urlWrapper.classList.add('hidden-section');
    urlInput.value = '';
  });

  // 2. Form Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      emailError.classList.remove('hidden');
      emailInput.focus();
      return;
    } else {
      emailError.classList.add('hidden');
    }

    // Collect Data
    const formData = {
      email: email,
      hasWebsite: hasWebsiteInput.value,
      websiteUrl: hasWebsiteInput.value === 'ある' ? (urlInput.value.trim() || '（未記入）') : '（なし）',
      companyName: companyInput.value.trim() || '（未記入）',
      inquiryContent: inquiryTextarea.value.trim() || '（特になし）',
      submittedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    };

    // UI Loading State
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = '送信中...';

    try {
      const result = await sendLeadEmail(formData);
      console.log('API Response:', result);
      showSuccessModal();
      form.reset();
      // Reset radio state
      labelYes.click();
    } catch (err) {
      console.error('送信エラー:', err);
      alert('送信通知:\n' + (err.message || '送信中にエラーが発生しました。'));
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
    }
  });
});

/**
 * Send email via Web3Forms API
 */
async function sendLeadEmail(data) {
  const config = window.APP_CONFIG || {};
  const accessKey = config.web3formsAccessKey || '1a2b4206-bba5-4b23-a347-54d7e8fe2c40';

  const mailBody = `
【3.3万円相当 個別分析レポート お申し込み】
=========================================
■ 送信日時: ${data.submittedAt} (JST)
■ メールアドレス: ${data.email}
■ ホームページ有無: ${data.hasWebsite}
■ ホームページURL: ${data.websiteUrl}
■ 会社名: ${data.companyName}

■ 特に気になること・相談したいこと:
${data.inquiryContent}
=========================================
`;

  const payload = {
    access_key: accessKey,
    subject: `【無料分析レポート申込】${data.companyName !== '（未記入）' ? data.companyName + ' 様' : data.email}`,
    from_name: 'Web個別分析レポート受付',
    email: data.email,
    'ホームページ有無': data.hasWebsite,
    'ホームページURL': data.websiteUrl,
    '会社名': data.companyName,
    '相談内容': data.inquiryContent,
    message: mailBody
  };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  if (!result.success) {
    throw new Error(result.message || 'Web3Forms API returned error');
  }
  return result;
}

/**
 * Modal Handling
 */
function showSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.querySelector('div').classList.remove('scale-95');
  modal.querySelector('div').classList.add('scale-100');
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.querySelector('div').classList.add('scale-95');
  modal.querySelector('div').classList.remove('scale-100');
}
