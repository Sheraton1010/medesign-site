document.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger プラグインの登録
  gsap.registerPlugin(ScrollTrigger);

  // ① お問い合わせボタンでスクロール
  const contactButton = document.getElementById('contactButton');
  if (contactButton) {
    contactButton.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ② ハンバーガーメニューのトグル処理（ナビゲーションのトランジション付き）
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      const isActive = !navMenu.classList.contains('active');
      navMenu.classList.toggle('active', isActive);
      hamburger.classList.toggle('active', isActive);
      if (isActive) {
        // 表示時：下から上へフェード＆スライドイン
        gsap.fromTo(navMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      } else {
        // 非表示時：上へフェードアウト
        gsap.to(navMenu, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" });
      }
    });
  }

  // ③ TOPへ戻るボタンの表示／非表示およびクリックでトップへスクロール
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const handleScroll = () => {
    scrollToTopBtn.classList.toggle('active', window.scrollY > 300);
  };
  window.addEventListener('scroll', handleScroll);
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ④ アコーディオン式 Q&A のトグル処理（GSAPでスライドアニメーション付き）
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        gsap.to(content, {
          duration: 0.3,
          height: 0,
          ease: "power2.in",
          onComplete: () => {
            content.style.display = "none";
          }
        });
      } else {
        content.style.display = "block";
        content.style.height = "0px";
        const fullHeight = content.scrollHeight;
        gsap.to(content, {
          duration: 0.3,
          height: fullHeight,
          ease: "power2.out",
          onComplete: () => {
            content.style.height = "auto";
          }
        });
      }
    });
  });

  // ⑤ ヒーローセクションのテキストアニメーション
  gsap.from('.hero-content', {
    duration: 1.2,
    opacity: 0,
    y: 50,
    ease: 'power2.out'
  });

  // ⑥ 各セクションがビューポートに入るとフェード＆スライドインするアニメーション（ScrollTrigger）
  gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // ⑦ ヒーローセクションのパララックス効果（スクロールに連動）
  gsap.to(".hero-image", {
    y: -50, // スクロールに合わせて上方向に移動
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // ⑧ Intersection Observer を利用して、お問い合わせセクションが表示されたら固定右パネルを非表示にする
  const fixedPanel = document.querySelector('.fixed-right-panel');
  const contactSection = document.getElementById('contact');
  if (fixedPanel && contactSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fixedPanel.classList.add('hidden');
        } else {
          fixedPanel.classList.remove('hidden');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(contactSection);
  }
});
