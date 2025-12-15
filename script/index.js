// Функциональный блок открытия/закрытия модального окна-  so мы можем создать еще один функциональный блок с переменной modal, тк переменная внутри одной области видимости может быть только одна, а таким образом мы можем разделить определенные области видимости, в данном случае область видимости - данная функция, в другой функции у нас тж мб переменная modal, но они не будут конфликтовать между собой*/
const modalFunc = () => {
    // Получаем DOM-элементы
    const modal = document.querySelector('.cart-modal__overlay');
    const cartBtn = document.querySelector('#cart-button'); /* поиск через id, поэтому # */

    // Функция открывает модальное окно
    const openModal = () => { 
        modal.classList.add('open'); /* обращаемся к классу без точки*/
    };

    // Функция закрывает модальное окно
    const closeModal = () => { /* функция закрыть модальное окно*/
        modal.classList.remove('open'); 
    }

    // По клику на кнопку открываем модальное окно
    cartBtn.addEventListener('click', () => {
        openModal();
    })

     // Закрываем модальное окно по клику на оверлей или на крестик, используя делигированиe - мы делигируем только один слушатель на все модальноe окно и уже проверяем его event.target, и если условие нам подходит(т.е. если это сам overlay либо иконка крестика), то мы при клике закрываем модальное окно, иначе нам бы пришлось навешать на модальное окно много событий 
    modal.addEventListener('click', (event) => { 
        if (
            event.target === modal || /* (запись проще, аналогично записи event.target.classList.contains('cart-modal__overlay') ||  то есть при клике проверяем, overlay это или нет */
            event.target.closest('.cart-modal__header--close') /* проверяем наличие класса cart-modal__header--close - вместо event.target.closest.contains('.cart-modal__header--close' - так выдается ошибка) */
        ) {
            closeModal();
        }  
    });
    // Закрыть модальное окно по клавише ESC
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
};

/* Создадим массив ресторанов и выведем оттуда карточки ресторанов путем перебора массива*/

const restFunc = () => {
    const container = document.querySelector('#rests-container');
    const restArray = [
        {
            id: 0,
            title: 'Пицца плюс',
            time: 50,
            rating: 4.5,
            price: 900,
            type: 'Пицца',
            img:'rest1.jpg',
        },
        {
            id: 1,
            title: 'Тануки',
            time: 45,
            rating: 4.6,
            price: 850,
            type: 'Суши',
            img: 'rest2.jpg',
        },
        {
            id: 2,
            title: 'FoodBand',
            time: 30,
            rating: 4.8,
            price: 1000,
            type: 'Европейская еда',
            img: 'rest3.jpg',
        },
        {
            id: 3,
            title: 'Жадина-пицца',
            time: 45,
            rating: 4.7,
            price: 750,
            type: 'Пицца',
            img: 'rest4.jpg',
        },
        {
            id: 4,
            title: 'Точка еды',
            time: 35,
            rating: 4.7,
            price: 500,
            type: 'Европейская еда',
            img: 'rest5.jpg',
        },
        {
            id: 5,
            title: 'PizzaBurger',
            time: 50,
            rating: 4.9,
            price: 600,
            type: 'Пицца, бургер',
            img: 'rest6.jpg',
        }
    ]

    const loading = () => {
        container.innerHTML = '<p style="width: 100%; text-align: center;">Загрузка</p>' /* контейнер флексовый, поэтому параграф не на всю ширину экрана*/
    }

    const renderRests = (restArray) => {
        container.innerHTML = '';
        restArray.forEach(card => {
            container.insertAdjacentHTML('beforeend',
                `
                    <a href="./goods.html?id=${card.id}" class="products-card">
                        <div class="products-card_image">
                            <img src="./images/rests/${card.img}" alt="${card.img}">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h4 class="products-card_description--title">${card.title}</h4>
                                <div class="products-card_description--badge">${card.time}</div>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description--info">
                                    <div class="products-card_description--rating">
                                        <img src="./images/icons/star.svg" alt="star">
                                            ${card.rating}
                                    </div>
                                    <div class="products-card_description--price">
                                        От ${card.price} ₽ 
                                    </div>
                                    <div class="products-card_description--group">
                                        ${card.type}
                                    </div>
                                </div>
                            </div>                               
                        </div>
                    </a>               
                `
            )
        })
    }

    if (container) {
        loading();

        setTimeout(() => {
            renderRests(restArray); /* вызываем отрисовку с задержкой 1сек*/
        }, 1000);
    }  
}

const goodsFunc = () => {
    const container = document.querySelector('#goods-container');

    const goodsArray = [
        {
            id: 0,
            title: 'Ролл угорь стандарт',
            info: 'Рис, угорь, соус унаги, кунжут, водоросли нори.',
            price: 250,
            img:'prd1.jpg',
        },
        {
            id: 1,
            title: 'Калифорния лосось стандарт',
            info: 'Рис, лосось, авокадо, огурец, майонез, икра масаго, водоросли нори.',
            price: 395,
            img:'prd2.jpg',
        },
        {
            id: 2,
            title: 'Окинава стандарт',
            info: 'Рис, креветка отварная, сыр сливочный, лосось, огурец свежий.',
            price: 340,
            img:'prd3.jpg',
        },
        {
            id: 3,
            title: 'Цезарь маки хl',
            info: 'Рис, куриная грудка копченая, икра масаго, томат, айсберг, соус цезарь...',
            price: 465,
            img:'prd4.jpg',
        },
        {
            id: 4,
            title: 'Ясай маки стандарт 185 г',
            info: 'Рис, помидор свежий, перец болгарский, авокадо, огурец, айсберг.',
            price: 290,
            img:'prd5.jpg',
        },
        {
            id: 5,
            title: 'Ролл с креветкой стандарт',
            info: 'Рис, водоросли нори, креветки отварные, сыр сливочный, огурцы.',
            price: 380,
            img:'prd6.jpg',
        }
    ]

    const loading = () => {
        container.innerHTML = '<p style="width: 100%; text-align: center;">Загрузка</p>' /* контейнер флексовый, поэтому параграф не на всю ширину экрана*/
    }

    const renderGoods = (goodsArray) => {
        container.innerHTML = '';
        goodsArray.forEach(card => {
            container.insertAdjacentHTML('beforeend',
                `
                    <div class="products-card">
                        <div class="products-card_image">
                            <img src="./images/goods/${card.img}" alt="${card.img}">
                        </div>
                        <div class="products-card_description">
                            <div class="products-card_description--row">
                                <h5 class="products-card_description--name">${card.title}</h5>
                            </div>
                            <div class="products-card_description--row">
                                <p class="products-card_description--text">${card.info}</p>
                            </div>
                            <div class="products-card_description--row">
                                <div class="products-card_description-controls">
                                    <button class="btn btn-primary">
                                        В корзину
                                        <img src="./images/icons/cart.svg" alt="shopping-cart">
                                    </button>
                                    <span class="products-card_description-controls--price">${card.price} ₽ </span>
                                </div>                                   
                            </div>
                        </div>
                    </div>               
                `
            )
        })
    }

    if (container) {
        loading();

        setTimeout(() => {
            renderGoods(goodsArray); /* вызываем отрисовку с задержкой 1сек*/
        }, 1000);
    }  
}

modalFunc(); 
restFunc();
goodsFunc();
