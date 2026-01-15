// ==UserScript==
// @name         GDUFS Auth Auto Login
// @namespace    https://github.com/Systina12/gdufs-auth-autologin
// @version      1.0
// @description  广外SSO的自动登录脚本，无需处理验证码。请自行编辑脚本替换用户名和密码。
// @author       Systina12
// @homepage     https://github.com/Systina12/gdufs-auth-autologin
// @supportURL  https://github.com/Systina12/gdufs-auth-autologin/issues
// @match        https://authserver.gdufs.edu.cn/authserver/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (!location.pathname.includes('/authserver/login')) {
        return;
    }

    const USERNAME = '你的学号';
    const PASSWORD = '你的密码';

    function waitFor(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const timer = setInterval(() => {
                const el = document.querySelector(selector);
                if (el) {
                    clearInterval(timer);
                    resolve(el);
                }
                if (Date.now() - start > timeout) {
                    clearInterval(timer);
                    reject(`Timeout: ${selector}`);
                }
            }, 200);
        });
    }

    function simulateInput(input, value) {
        input.focus();
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        for (const ch of value) {
            input.value += ch;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
        input.blur();
    }

    async function autoLogin() {
        try {
            const usernameInput = await waitFor('#username');
            const passwordInput = await waitFor('#password');
            const loginBtn = await waitFor('#login_submit');

            simulateInput(usernameInput, USERNAME);
            simulateInput(passwordInput, PASSWORD);

            setTimeout(() => {
                loginBtn.click();
            }, 300);

        } catch (err) {
            console.error('[GDUFS AutoLogin]', err);
        }
    }

    autoLogin();
})();
