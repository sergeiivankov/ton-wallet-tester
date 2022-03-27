window.addEventListener('load', () => {
  const URI = 'ton://transfer/EQAEsS9_xtLyQxbCkIP3vf-RlI53w8tcPN7g8I12I8Xwsry0?amount=1000000000&text=comment';

  const $ = document.querySelector.bind(document);

  $('.js-uri-open-function').addEventListener('click', () => {
    window.open(URI, '_blank');
  });

  $('.js-uri-location').addEventListener('click', () => {
    location = URI;
  });

  $('.js-uri-iframe-src').addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = URI;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  });

  $('.js-uri-iframe-location').addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'about:blank';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow.location.href = URI;
  });
});