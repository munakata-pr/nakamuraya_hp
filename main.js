document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ヘッダーのスクロール制御
    // ヒーローセクションを通り過ぎたらヘッダーに背景色を付ける
    const header = document.querySelector('.js-header');
    const hero = document.querySelector('.hero');
    
    if (header && hero) {
        const headerObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            // ヒーローセクションが画面から外れたらヘッダーの色を変える
            if (!entry.isIntersecting) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }, {
            // ヒーローセクションの底辺が画面上部に触れるタイミング
            threshold: 0,
            rootMargin: `-${header.offsetHeight}px 0px 0px 0px`
        });
        
        headerObserver.observe(hero);
    }

    // 2. スクロールに応じたフェードインアニメーション
    // 「js-fade-in-up」クラスを持つ要素が画面に入ったら「is-visible」クラスを付与
    const fadeElements = document.querySelectorAll('.js-fade-in-up');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // 一度表示されたら監視を終了する（毎回アニメーションさせない場合）
                    // observer.unobserve(entry.target);
                } else {
                    // スクロールで戻った時にもう一度アニメーションさせたい場合は外す
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            // 要素が画面の下から10%見えたら発火（早すぎず遅すぎず）
            threshold: 0,
            rootMargin: '0px 0px -10% 0px'
        });
        
        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // 3. スムーススクロール（ページ内リンク用・必要に応じて）
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
