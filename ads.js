/* ===== ads.js ===== */
/* Фиксированные рекламные баннеры по бокам страницы */

(function() {
    'use strict';

    // ============================================================
    // НАСТРОЙКИ РЕКЛАМЫ — РЕДАКТИРУЙТЕ ЗДЕСЬ
    // ============================================================
    const ADS_CONFIG = {
        // Показывать ли рекламу (true/false)
        enabled: true,

        // Задержка перед показом (мс)
        delay: 800,

        // Левая колонка рекламы
        left: [
            {
                id: 'ad-left-1',
                // Заголовок (жирный текст)
                title: '🚀 Лучший генератор промптов для нейросетей',
                // Описание (обычный текст)
                description: 'Соберите точный запрос для нейросети за пару минут — без пустого листа и бесконечных правок.',
                // Текст кнопки
                buttonText: 'Попробовать',
                // Ссылка (куда ведёт клик)
                link: 'https://timoshamoscow.github.io/taiprompts.github.io/',
                // Цвет акцента (кнопка + верхняя полоса)
                color: '#5e72e4',
                // Эмодзи/иконка (крупная в углу)
                icon: '🚀',
                // Метка рекламы (по закону)
                label: 'Реклама'
            },
            {
                id: 'ad-left-2',
                title: '🔮 Язык будущего (проще русского)',
                description: 'Простой, логичный, современный. Создан Тимофеем Сибилевым для лёгкого общения',
                buttonText: 'Узнать больше',
                link: 'https://timoshamoscow.github.io/sibylevec-site.github.io/',
                color: '#3ea9bf',
                icon: '🔮',
                label: 'Реклама'
            }
        ],

        // Правая колонка рекламы
        right: [
            {
                id: 'ad-right-1',
                title: '🖥️ TPlayer',
                description: 'Профессиональный видеоплеер с 40+ функциями: PiP, скриншоты, закладки, эквалайзер, режим "Только аудио", A/B повтор и многое другое.',
                buttonText: 'Установить',
                link: 'https://timoshamoscow.github.io/tplayer/',
                color: '#ff0000',
                icon: '🖥️',
                label: 'Реклама'
            },
            {
                id: 'ad-right-2',
                title: '🎨 Студия скинов, рендеров и многого другого по Minecraft',
                description: 'Индивидуальный дизайн, быстрые сроки и доступные цены. От идеи до готового результата — за 1-2 дня.',
                buttonText: 'Заказать',
                link: 'https://timoshamoscow.github.io/tstudios/',
                color: '#3b82f6',
                icon: '🎨',
                label: 'Реклама'
            }
        ]
    };

    // ============================================================
    // СТИЛИ (внедряются в <head> при загрузке)
    // ============================================================
    const AD_STYLES = `
        .ct-ads-container {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            z-index: 800;
            display: flex;
            flex-direction: column;
            gap: 20px;
            pointer-events: none;
            width: 180px;
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        .ct-ads-container.visible {
            opacity: 1;
            pointer-events: auto;
        }
        .ct-ads-left {
            left: 15px;
        }
        .ct-ads-right {
            right: 15px;
        }
        .ct-ad-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border: 1px solid #e5e7eb;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .ct-ad-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
            border-color: #06b6d4;
        }
        .ct-ad-topbar {
            height: 4px;
            width: 100%;
            background: #06b6d4;
        }
        .ct-ad-label {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 9px;
            font-weight: 600;
            color: #9ca3af;
            background: #f9fafb;
            padding: 2px 8px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            z-index: 2;
        }
        .ct-ad-body {
            padding: 16px 14px 14px;
        }
        .ct-ad-icon {
            font-size: 26px;
            margin-bottom: 8px;
            line-height: 1;
        }
        .ct-ad-title {
            font-size: 13px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 6px;
            line-height: 1.3;
            word-break: break-word;
        }
        .ct-ad-description {
            font-size: 11px;
            color: #6b7280;
            line-height: 1.4;
            margin-bottom: 12px;
            word-break: break-word;
        }
        .ct-ad-btn {
            display: block;
            width: 100%;
            padding: 8px 10px;
            border: none;
            border-radius: 8px;
            background: #06b6d4;
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            letter-spacing: 0.3px;
            text-decoration: none;
        }
        .ct-ad-card:hover .ct-ad-btn {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }
        .ct-ad-close {
            position: absolute;
            top: 6px;
            left: 6px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            z-index: 3;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        .ct-ad-card:hover .ct-ad-close {
            display: flex;
        }
        .ct-ad-close:hover {
            background: #ef4444;
            color: #ffffff;
            border-color: #ef4444;
        }

        /* Скрытие на узких экранах */
        @media (max-width: 1400px) {
            .ct-ads-container {
                width: 150px;
            }
            .ct-ad-title {
                font-size: 12px;
            }
            .ct-ad-description {
                font-size: 10px;
            }
        }
        @media (max-width: 1200px) {
            .ct-ads-container {
                display: none !important;
            }
        }

        /* Тёмная тема (если на странице есть [data-theme="dark"]) */
        [data-theme="dark"] .ct-ad-card {
            background: #1f2937;
            border-color: #374151;
        }
        [data-theme="dark"] .ct-ad-title {
            color: #f3f4f6;
        }
        [data-theme="dark"] .ct-ad-description {
            color: #9ca3af;
        }
        [data-theme="dark"] .ct-ad-label {
            background: #111827;
            border-color: #374151;
            color: #6b7280;
        }
        [data-theme="dark"] .ct-ad-close {
            background: #111827;
            border-color: #374151;
            color: #6b7280;
        }
    `;

    // ============================================================
    // ЛОГИКА
    // ============================================================

    // Хранилище скрытых реклам (в localStorage)
    function getClosedAds() {
        try {
            return JSON.parse(localStorage.getItem('ct_closed_ads') || '[]');
        } catch (e) {
            return [];
        }
    }

    function closeAd(adId) {
        const closed = getClosedAds();
        if (!closed.includes(adId)) {
            closed.push(adId);
            localStorage.setItem('ct_closed_ads', JSON.stringify(closed));
        }
        const el = document.querySelector(`[data-ad-id="${adId}"]`);
        if (el) {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '0';
            el.style.transform = 'translateX(' + (el.closest('.ct-ads-left') ? '-40px' : '40px') + ')';
            setTimeout(() => el.remove(), 300);
        }
    }

    // Создание карточки рекламы
    function createAdCard(ad) {
        const card = document.createElement('div');
        card.className = 'ct-ad-card';
        card.dataset.adId = ad.id;

        card.innerHTML = `
            <div class="ct-ad-topbar" style="background: ${ad.color || '#06b6d4'};"></div>
            <span class="ct-ad-label">${ad.label || 'Реклама'}</span>
            <button class="ct-ad-close" title="Скрыть">✕</button>
            <div class="ct-ad-body">
                ${ad.icon ? `<div class="ct-ad-icon">${ad.icon}</div>` : ''}
                <div class="ct-ad-title">${escapeHtml(ad.title || '')}</div>
                ${ad.description ? `<div class="ct-ad-description">${escapeHtml(ad.description)}</div>` : ''}
                <a href="${escapeAttr(ad.link || '#')}" target="_blank" rel="noopener noreferrer" class="ct-ad-btn" style="background: ${ad.color || '#06b6d4'};">
                    ${escapeHtml(ad.buttonText || 'Подробнее')}
                </a>
            </div>
        `;

        // Закрытие
        const closeBtn = card.querySelector('.ct-ad-close');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAd(ad.id);
        });

        return card;
    }

    // Простая защита от XSS
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // Создание контейнера
    function createContainer(side) {
        const container = document.createElement('div');
        container.className = `ct-ads-container ct-ads-${side}`;
        container.setAttribute('aria-label', side === 'left' ? 'Реклама слева' : 'Реклама справа');
        return container;
    }

    // Заполнение контейнера рекламой
    function fillContainer(container, ads) {
        const closed = getClosedAds();
        const activeAds = ads.filter(ad => !closed.includes(ad.id));
        if (activeAds.length === 0) {
            container.style.display = 'none';
            return;
        }
        activeAds.forEach(ad => {
            container.appendChild(createAdCard(ad));
        });
    }

    // Инициализация
    function init() {
        if (!ADS_CONFIG.enabled) return;

        // Внедряем стили
        const styleEl = document.createElement('style');
        styleEl.id = 'ct-ads-styles';
        styleEl.textContent = AD_STYLES;
        document.head.appendChild(styleEl);

        // Создаём контейнеры
        const leftContainer = createContainer('left');
        const rightContainer = createContainer('right');

        // Заполняем
        if (ADS_CONFIG.left && ADS_CONFIG.left.length > 0) {
            fillContainer(leftContainer, ADS_CONFIG.left);
            if (leftContainer.children.length > 0) {
                document.body.appendChild(leftContainer);
            }
        }
        if (ADS_CONFIG.right && ADS_CONFIG.right.length > 0) {
            fillContainer(rightContainer, ADS_CONFIG.right);
            if (rightContainer.children.length > 0) {
                document.body.appendChild(rightContainer);
            }
        }

        // Плавное появление
        setTimeout(() => {
            if (leftContainer.parentNode) leftContainer.classList.add('visible');
            if (rightContainer.parentNode) rightContainer.classList.add('visible');
        }, ADS_CONFIG.delay);

        // Перепроверка при изменении размера (если скрыли все — прячем контейнер)
        window.addEventListener('resize', () => {
            [leftContainer, rightContainer].forEach(c => {
                if (c.parentNode && c.querySelectorAll('.ct-ad-card').length === 0) {
                    c.style.display = 'none';
                }
            });
        });
    }

    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Экспорт API для управления из консоли/других скриптов
    window.CreativeAds = {
        config: ADS_CONFIG,
        show: () => {
            ADS_CONFIG.enabled = true;
            document.querySelectorAll('.ct-ads-container').forEach(c => c.classList.add('visible'));
        },
        hide: () => {
            document.querySelectorAll('.ct-ads-container').forEach(c => c.classList.remove('visible'));
        },
        resetClosed: () => {
            localStorage.removeItem('ct_closed_ads');
            location.reload();
        }
    };

})();
