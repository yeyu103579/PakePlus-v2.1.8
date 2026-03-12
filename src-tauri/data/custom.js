window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// ========== 以下为您的自定义脚本（可自由修改）==========

// 定义隐藏函数：一次性隐藏您指定的所有元素
function hideButtons() {
    const unwantedButtons = document.querySelectorAll(
        '.el-button.el-button--large.doc-btn, ' +
        '.el-button.join-group-btn.el-tooltip__trigger, ' +
        '.el-button.el-button--primary.recharge-button, ' +
        '.el-button.el-button--primary.activity-button, ' + 
        '.tutorial-link, ' +
        '.link-separator, .button-icon'+
        '.logo-image, ' +
        '.logo-text' 
    );
    unwantedButtons.forEach(btn => {
        btn.style.display = 'none';
    });
    console.log('隐藏按钮已执行，共隐藏了', unwantedButtons.length, '个元素');
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    console.log('自定义脚本开始运行');

    // 首次隐藏
    hideButtons();

    // ----- 添加新功能按钮（请根据实际需要修改）-----
    setTimeout(() => {
        // !!! 重要：请将下面的容器选择器替换为您网站上实际的位置 !!!
        // 例如：const container = document.querySelector('.toolbar'); 
        const container = document.querySelector('.main-toolbar') || 
                          document.getElementById('header');
        if (container) {
            const newBtn = document.createElement('button');
            newBtn.textContent = '✨ 我的专属功能';
            newBtn.style.cssText = `
                margin-left: 15px;
                padding: 8px 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            newBtn.onclick = function() {
                alert('这是您添加的新功能！');
                // 在这里编写您实际需要的功能
            };
            container.appendChild(newBtn);
            console.log('新按钮已添加');
        } else {
            console.warn('未找到容器，无法添加按钮');
        }
    }, 1000); // 延迟1秒确保页面元素加载

    // ----- 监听 DOM 变化，确保动态加载的元素也能被隐藏 -----
    const observer = new MutationObserver(function(mutations) {
        hideButtons(); // 每当 DOM 有变化，重新隐藏一次
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    console.log('DOM 变化监听已启动');
});