window.addEventListener('load', () => {
  const URI = 'ton://transfer/EQAEsS9_xtLyQxbCkIP3vf-RlI53w8tcPN7g8I12I8Xwsry0?amount=1000000000&text=comment';

  const $ = document.querySelector.bind(document);

  let haveLogs = false;
  const $providerLog = $('.js-provider-log');

  const writeToLog = content => {
    $providerLog.innerHTML += `${haveLogs ? '\n\n' : ''}${(new Date()).toLocaleTimeString()} (${performance.now()})\n${content}`;

    if (!haveLogs) {
      haveLogs = true;
      $providerLog.style.display = null;
    }

    $providerLog.scroll(0, 999999);
  };

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

  $('.js-method-get-chain').addEventListener('click', async () => {
    writeToLog('Send "ton_getChainId"');
    const chainId = await window.ton.send('ton_getChainId');
    writeToLog(`Receive "ton_getChainId" answer: ${chainId}`);
  });

  $('.js-method-raw-sign').addEventListener('click', async () => {
    writeToLog('Send "ton_rawSign"');
    const signed = await window.ton.send('ton_rawSign', [{
      data: '74657374746573747465737474657374746573747465737474657374'
    }]);
    writeToLog(`Receive "ton_rawSign" answer: ${signed}`);
  });

  $('.js-method-personal-sign').addEventListener('click', async () => {
    writeToLog('Send "ton_personalSign"');
    const signed = await window.ton.send('ton_personalSign', [{ data: '74657374746573747465737474657374746573747465737474657374' }]);
    writeToLog(`Receive "ton_personalSign" answer: ${signed}`);
  });

  const initDapp = () => {
    $('.js-not-connected').style.display = 'none';
    $('.js-connected').classList.remove('is-hidden');

    $('.js-dapp-section').style.display = null;

    window.ton.on('connect', () => {
      writeToLog('Receive "connect" event');
    });

    window.ton.on('close', (code, reason) => {
      writeToLog(`Receive "close" event with code and reason: ${code}, ${reason}`);
    });

    window.ton.on('notification', result => {
      writeToLog(`Receive "notification" event with data: ${JSON.stringify(result)}`);
    });

    window.ton.on('chainChanged', chainId => {
      writeToLog(`Receive "chainChanged" event with chain identifier: ${chainId}`);
    });

    window.ton.on('accountsChanged', accounts => {
      writeToLog(`Receive "accountsChanged" event with accounts: ${accounts.join(', ')}`);
    });
  };

  if (window.ton) initDapp();
  else window.initDapp('tonready', initEventsLog);
});