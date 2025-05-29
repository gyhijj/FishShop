// Products
const products = [
 {
        id: 1,
        name: "Спиннинг Fisherman Pro Carbon",
        categoryId: 1,
        categoryName: "Удочки",
        price: 4599,
        oldPrice: 5999,
        
        
        image: "https://30.img.avito.st/image/1/1.HmteCLa5soJooXCHbnx-d6GrtIjqK7pA76uwhuKhuIA.SFO9HXzaXl_-ofPJbFh-vrjrtSU-1J_CnCll49G_mDU",
        images: [
            "https://30.img.avito.st/image/1/1.HmteCLa5soJooXCHbnx-d6GrtIjqK7pA76uwhuKhuIA.SFO9HXzaXl_-ofPJbFh-vrjrtSU-1J_CnCll49G_mDU",
            "https://hoxwell.ru/upload/resize_cache/iblock/fd4/1440_1920_0/43465r6gnajkftjqftzb60ayf1fhbcwa.jpg",
            "https://avatars.mds.yandex.net/get-mpic/5286714/img_id6492366873379647177.png/orig"
        ],
        isNew: false,
        isSale: true,
        description: "Профессиональный спиннинг из высококачественного карбона с улучшенной чувствительностью. Идеально подходит для ловли хищной рыбы на различные приманки.",
        features: [
            "Материал: высокомодульный карбон",
            "Длина: 2.4 метра",
            "Тест: 5-25 грамм",
            "Вес: 125 грамм",
            "Количество секций: 2"
        ],
        stock: 15
    },
    {
        id: 2,
        name: "Телескопическая удочка Master Fisher",
        categoryId: 1,
        categoryName: "Удочки",
        price: 2199,
        oldPrice: null,
        
        
        image: "https://hoxwell.ru/upload/resize_cache/iblock/fd4/1440_1920_0/43465r6gnajkftjqftzb60ayf1fhbcwa.jpg",
        images: [
            "https://hoxwell.ru/upload/resize_cache/iblock/fd4/1440_1920_0/43465r6gnajkftjqftzb60ayf1fhbcwa.jpg",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922",
            "https://avatars.mds.yandex.net/get-mpic/5286714/img_id6492366873379647177.png/orig"
        ],
        isNew: true,
        isSale: false,
        description: "Телескопическая удочка для поплавочной ловли. Компактная в сложенном виде, удобно транспортировать. Подходит для рыбалки в пресной воде. Длина: 4.5м.",
        features: [
            "Материал: композит",
            "Длина: 4.5 метра",
            "Вес: 270 грамм",
            "Количество секций: 6",
            "Компактный размер в сложенном виде"
        ],
        stock: 22
    },
    
    // Категория 2: Катушки
    {
        id: 3,
        name: "Безынерционная катушка AquaFisher 3000",
        categoryId: 2,
        categoryName: "Катушки",
        price: 3299,
        oldPrice: 3899,
        
        
        image: "https://avatars.mds.yandex.net/i?id=bd44812f5e13bf8ec037053f1499b90d_l-5307529-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=bd44812f5e13bf8ec037053f1499b90d_l-5307529-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1716573716221-b0be1d106d81",
            "https://images.unsplash.com/photo-1727510226428-da71a8ed1534"
        ],
        isNew: false,
        isSale: true,
        description: "Надежная безынерционная катушка с плавным ходом и высокой износостойкостью. Оснащена 9 подшипниками и системой мгновенного стопора обратного хода. Идеально подходит для спиннинговой ловли.",
        features: [
            "Количество подшипников: 9+1",
            "Передаточное число: 5.2:1",
            "Вес: 280 грамм",
            "Лесоемкость: 0.25мм/240м",
            "Материал шпули: алюминий"
        ],
        stock: 9
    },
    {
        id: 4,
        name: "Мультипликаторная катушка ProCast",
        categoryId: 2,
        categoryName: "Катушки",
        price: 6799,
        oldPrice: null,
        
        
        image: "https://joyfish.ru/wa-data/public/shop/products/79/02/20279/images/84859/84859.750x0.jpg",
        images: [
            "https://joyfish.ru/wa-data/public/shop/products/79/02/20279/images/84859/84859.750x0.jpg",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f",
            "https://images.unsplash.com/photo-1727510226428-da71a8ed1534"
        ],
        isNew: true,
        isSale: false,
        description: "Профессиональная мультипликаторная катушка для троллинга и джиговой ловли. Обладает высокой мощностью и надежностью. Оснащена системой магнитного тормоза для точного заброса.",
        features: [
            "Количество подшипников: 7+1",
            "Передаточное число: 6.3:1",
            "Вес: 215 грамм",
            "Максимальное тяговое усилие: 8 кг",
            "Система торможения: магнитная"
        ],
        stock: 5
    },
    // Категория 3: Приманки
    {
        id: 5,
        name: "Набор воблеров TroutMaster (5 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 1999,
        oldPrice: 2499,
        
        
        image: "https://tackletest.rybalka.com/upload/post_images/5ee7f71e49388.jpeg",
        images: [
            "https://tackletest.rybalka.com/upload/post_images/5ee7f71e49388.jpeg",
            "https://images.unsplash.com/photo-1597840538983-028cdcfb942e",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574"
        ],
        isNew: false,
        isSale: true,
        description: "Набор из 5 воблеров разных размеров и расцветок. Идеально подходит для ловли хищной рыбы. Каждый воблер оснащен острыми тройными крючками и имеет реалистичную игру.",
        features: [
            "Количество в наборе: 5 шт",
            "Размеры: от 5 до 7 см",
            "Тип: плавающие",
            "Глубина погружения: 0.5-2.5м",
            "Оснащены тройными крючками"
        ],
        stock: 18
    },
    {
        id: 6,
        name: "Силиконовые приманки FishHunter",
        categoryId: 3,
        categoryName: "Приманки",
        price: 899,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/4580278/img_id930524726251984540.png/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/4580278/img_id930524726251984540.png/orig",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574"
        ],
        isNew: false,
        isSale: false,
        description: "Набор мягких силиконовых приманок различных форм и расцветок. В комплекте 20 штук. Подходят для джиговой ловли и дроп-шота. Имеют запах рыбы для привлечения хищника.",
        features: [
            "Количество в наборе: 20 шт",
            "Размеры: от 4 до 7 см",
            "Материал: мягкий силикон",
            "Аромат: рыбный",
            "Разные цвета и формы"
        ],
        stock: 30
    },
    // Категория 4: Лески и шнуры
    {
        id: 7,
        name: "Плетеная леска StrongPower X8",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 1299,
        oldPrice: 1599,
        
        
        image: "https://avatars.mds.yandex.net/i?id=efd8abf430b417e7a165de9e3fdd680c_sr-10696063-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=efd8abf430b417e7a165de9e3fdd680c_sr-10696063-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1631389851191-2e3ad60220b1",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73"
        ],
        isNew: false,
        isSale: true,
        description: "Прочная плетеная леска из 8 нитей японского PE волокна. Обладает высокой прочностью и нулевой растяжимостью. Округлое сечение обеспечивает дальний заброс и меньшее сопротивление в кольцах.",
        features: [
            "Материал: PE волокно (8 нитей)",
            "Длина: 150 метров",
            "Тест: 10 кг (0.14 мм)",
            "Цвет: зеленый",
            "Нулевая растяжимость"
        ],
        stock: 25
    },
    // Категория 5: Одежда
    {
        id: 8,
        name: "Рыболовный костюм AquaGuard Pro",
        categoryId: 5,
        categoryName: "Одежда",
        price: 8999,
        oldPrice: 11999,
        
        
        image: "https://avatars.mds.yandex.net/i?id=107b4ae805f73d538882e2c176ef056b_l-11401793-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=107b4ae805f73d538882e2c176ef056b_l-11401793-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d"
        ],
        isNew: false,
        isSale: true,
        description: "Профессиональный водонепроницаемый костюм для рыбалки в любую погоду. Состоит из куртки и брюк с регулируемыми подтяжками. Мембрана 10000/10000 защищает от влаги и ветра, сохраняя комфорт.",
        features: [
            "Материал: 3-слойная мембрана",
            "Водонепроницаемость: 10000 мм",
            "Дышащая способность: 10000 г/м²/24ч",
            "Утеплитель: Thinsulate 150 г/м²",
            "Проклеенные швы, множество карманов"
        ],
        stock: 7
    },
    // Категория 6: Аксессуары
    {
        id: 9,
        name: "Рыболовный ящик FishBox XL",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 3499,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/12520491/2a0000018d6a5c6d30181c040b2d10d3be2e/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/12520491/2a0000018d6a5c6d30181c040b2d10d3be2e/orig",
            "https://images.unsplash.com/photo-1688227027071-84d4452ba5c2",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2"
        ],
        isNew: true,
        isSale: false,
        description: "Вместительный и удобный рыболовный ящик с несколькими отделениями и выдвижными лотками для организованного хранения всех рыболовных принадлежностей. Изготовлен из прочного водонепроницаемого пластика.",
        features: [
            "Размеры: 46 x 28 x 26 см",
            "Материал: ударопрочный пластик",
            "3 выдвижных лотка",
            "Водонепроницаемые замки",
            "Вес: 2.1 кг"
        ],
        stock: 12
    },
    {
        id: 10,
        name: "Подсачек телескопический треугольный  Carbon",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 2299,
        oldPrice: 2699,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/7979862/img_id99638760331011607.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/7979862/img_id99638760331011607.jpeg/orig",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2"
        ],
        isNew: false,
        isSale: true,
        description: "Легкий и прочный телескопический подсачек из карбона. Удобен для вываживания крупной рыбы. Сетка с мелкой ячейкой не травмирует рыбу при поимке и отпускании.",
        features: [
            "Материал рукояти: карбон",
            "Длина в разложенном виде: 2.4м",
            "Длина в сложенном виде: 0.7м",
            "Размер головы: 50x40 см",
            "Мелкоячеистая сетка"
        ],
        stock: 14
    },
    // Новые товары для категории 1 (Удочки)
    {
        id: 11,
        name: "Фидерное удилище Expert Feeder",
        categoryId: 1,
        categoryName: "Удочки",
        price: 5199,
        oldPrice: 5899,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/5286714/img_id6492366873379647177.png/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/5286714/img_id6492366873379647177.png/orig",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922",
            "https://images.unsplash.com/photo-1551131618-3f0a5cf594b4"
        ],
        isNew: false,
        isSale: true,
        description: "Высококачественное фидерное удилище для ловли на большой дистанции. Имеет три сменные вершинки различной жесткости. Чувствительные кончики отлично показывают поклевку.",
        features: [
            "Материал: карбон",
            "Длина: 3.9 метра",
            "Тест: 90-150 грамм",
            "Вес: 295 грамм",
            "Количество секций: 3 + 3 вершинки"
        ],
        stock: 11
    },
    {
        id: 12,
        name: "Спиннинг ультралайт LightStream",
        categoryId: 1,
        categoryName: "Удочки",
        price: 3790,
        oldPrice: null,
        
        
        image: "https://www.adrenalin.ru/upload/iblock/e3d/1212.jpg",
        images: [
            "https://www.adrenalin.ru/upload/iblock/e3d/1212.jpg",
            "https://images.unsplash.com/photo-1542397994-696a3f0c8f9a",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922"
        ],
        isNew: true,
        isSale: false,
        description: "Легкий и чувствительный спиннинг для ультралайтовой ловли. Идеален для ловли форели, окуня и другой некрупной рыбы на легкие приманки.",
        features: [
            "Материал: высокомодульный карбон",
            "Длина: 2.1 метра",
            "Тест: 2-10 грамм",
            "Вес: 98 грамм",
            "Строй: быстрый"
        ],
        stock: 9
    },
    {
        id: 13,
        name: "Карповое удилище DarkForce",
        categoryId: 1,
        categoryName: "Удочки",
        price: 7490,
        oldPrice: 8999,
        
        
        image: "https://im9.cz/sk/iR/importprodukt-orig/fd6/fd66e1d414fe0737d78b0ce378aa9194.jpg",
        images: [
            "https://im9.cz/sk/iR/importprodukt-orig/fd6/fd66e1d414fe0737d78b0ce378aa9194.jpg",
            "https://images.unsplash.com/photo-1542397994-696a3f0c8f9a",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922"
        ],
        isNew: false,
        isSale: true,
        description: "Мощное карповое удилище для ловли трофейного карпа. Обладает отличной прочностью и дальнобойностью. Комплектуется чехлом для транспортировки.",
        features: [
            "Материал: композит с карбоновым усилением",
            "Длина: 3.6 метра",
            "Тест: 3.5lb",
            "Вес: 380 грамм",
            "Количество секций: 2"
        ],
        stock: 6
    },
    {
        id: 14,
        name: "Маховая удочка Tometa Pole 500",
        categoryId: 1,
        categoryName: "Удочки",
        price: 2990,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/5236584/img_id2108096097168097860.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/5236584/img_id2108096097168097860.jpeg/orig",
            "https://images.unsplash.com/photo-1551131618-3f0a5cf594b4",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922"
        ],
        isNew: false,
        isSale: false,
        description: "Классическая маховая удочка для поплавочной ловли без колец. Легкая и сбалансированная, позволяет ловить рыбу на небольшом и среднем расстоянии от берега.",
        features: [
            "Материал: композит",
            "Длина: 5 метров",
            "Вес: 190 грамм",
            "Количество секций: 5",
            "Транспортировочная длина: 115 см"
        ],
        stock: 18
    },
    {
        id: 15,
        name: "Зимняя удочка IceHunter Pro",
        categoryId: 1,
        categoryName: "Удочки",
        price: 1599,
        oldPrice: 1899,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/10637301/2a0000018af88f6cbfeef361032ae6e7c35f/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/10637301/2a0000018af88f6cbfeef361032ae6e7c35f/orig",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922",
            "https://images.unsplash.com/photo-1551131618-3f0a5cf594b4"
        ],
        isNew: false,
        isSale: true,
        description: "Профессиональная зимняя удочка для ловли на мормышку или блесну. Оснащена чувствительным кивком из специального сплава. Рукоять с пробковым покрытием не скользит в руке.",
        features: [
            "Материал: углепластик",
            "Длина: 30 см",
            "Вес: 65 грамм",
            "Тип кивка: металлический",
            "Рукоять: пробка"
        ],
        stock: 25
    },
    {
        id: 16,
        name: "Морское удилище OceanHunter",
        categoryId: 1,
        categoryName: "Удочки",
        price: 6899,
        oldPrice: null,
        
        
        image: "https://cdn.vseinstrumenti.ru/images/goods/sport-i-turizm/tovary-dlya-ohoty-i-rybalki/11178452/560x504/150677294.jpg",
        images: [
            "https://cdn.vseinstrumenti.ru/images/goods/sport-i-turizm/tovary-dlya-ohoty-i-rybalki/11178452/560x504/150677294.jpg",
            "https://images.unsplash.com/photo-1542397994-696a3f0c8f9a",
            "https://images.unsplash.com/photo-1619054976487-7198b8924922"
        ],
        isNew: true,
        isSale: false,
        description: "Мощное морское удилище для троллинга и рыбалки в открытом море. Выдерживает экстремальные нагрузки. Устойчиво к воздействию соленой воды.",
        features: [
            "Материал: композит с карбоном",
            "Длина: 2.1 метра",
            "Тест: 30-50 lb",
            "Вес: 450 грамм",
            "Кольца: SiC с защитой от коррозии"
        ],
        stock: 7
    },
    
    // Новые товары для категории 2 (Катушки)
    {
        id: 17,
        name: "Безынерционная катушка LightSpin 2000",
        categoryId: 2,
        categoryName: "Катушки",
        price: 2499,
        oldPrice: 2999,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/7430655/img_id6393885738677374798.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/7430655/img_id6393885738677374798.jpeg/orig",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f",
            "https://images.unsplash.com/photo-1716573716221-b0be1d106d81"
        ],
        isNew: false,
        isSale: true,
        description: "Легкая катушка для ультралайтовой и лайтовой ловли. Плавный ход, надежный фрикционный тормоз. Идеальна для ловли окуня, форели и другой некрупной рыбы.",
        features: [
            "Количество подшипников: 7+1",
            "Передаточное число: 5.1:1",
            "Вес: 198 грамм",
            "Лесоемкость: 0.20мм/180м",
            "Материал шпули: алюминий"
        ],
        stock: 14
    },
    {
        id: 18,
        name: "Карповая катушка CarpMaster 8000",
        categoryId: 2,
        categoryName: "Катушки",
        price: 5499,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/4331935/2a0000018f90393b545ac0831646aa1ecdd7/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/4331935/2a0000018f90393b545ac0831646aa1ecdd7/orig",
            "https://images.unsplash.com/photo-1716573716221-b0be1d106d81",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f"
        ],
        isNew: true,
        isSale: false,
        description: "Мощная катушка для карповой ловли с байтраннером. Вместительная шпуля позволяет использовать толстые лески. Байтраннер дает возможность рыбе свободно стягивать леску до подсечки.",
        features: [
            "Количество подшипников: 5+1",
            "Передаточное число: 4.8:1",
            "Вес: 580 грамм",
            "Лесоемкость: 0.30мм/340м",
            "Система байтраннер"
        ],
        stock: 8
    },
    {
        id: 19,
        name: "Мультипликаторная катушка BaitCaster Pro",
        categoryId: 2,
        categoryName: "Катушки",
        price: 7899,
        oldPrice: 8990,
        
        
        image: "https://7ft.ru/upload/tradeinn/upload_file_more_c78e2fea37fa03dbce61aaa844caef56.jpg",
        images: [
            "https://7ft.ru/upload/tradeinn/upload_file_more_c78e2fea37fa03dbce61aaa844caef56.jpg",
            "https://images.unsplash.com/photo-1716573716221-b0be1d106d81",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f"
        ],
        isNew: false,
        isSale: true,
        description: "Высокоточная мультипликаторная катушка с центробежной и магнитной системами торможения. Подходит для точных забросов и техничной ловли.",
        features: [
            "Количество подшипников: 11+1",
            "Передаточное число: 7.1:1",
            "Вес: 195 грамм",
            "Максимальное тяговое усилие: 8.5 кг",
            "Двойная система торможения"
        ],
        stock: 5
    },
    {
        id: 20,
        name: "Фидерная катушка FeederMax 4000",
        categoryId: 2,
        categoryName: "Катушки",
        price: 3799,
        oldPrice: null,
        
        
        image: "https://a.allegroimg.com/s1024/0c9083/1d12971f4cda83aae5f481b73263",
        images: [
            "https://a.allegroimg.com/s1024/0c9083/1d12971f4cda83aae5f481b73263",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f",
            "https://images.unsplash.com/photo-1727510226428-da71a8ed1534"
        ],
        isNew: false,
        isSale: false,
        description: "Специализированная катушка для фидерной ловли с неглубокой шпулей для дальнего заброса тяжелых кормушек. Имеет точную регулировку фрикциона.",
        features: [
            "Количество подшипников: 6+1",
            "Передаточное число: 5.2:1",
            "Вес: 320 грамм",
            "Лесоемкость: 0.25мм/270м",
            "Усиленные шестерни"
        ],
        stock: 10
    },
    {
        id: 21,
        name: "Морская катушка SeaHunter 6500",
        categoryId: 2,
        categoryName: "Катушки",
        price: 8499,
        oldPrice: 12990,
        rating: 5,
        
        image: "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/ZvQAAOSwmpFganu4/$_57.JPG?set_id=8800005007",
        images: [
            "https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/ZvQAAOSwmpFganu4/$_57.JPG?set_id=8800005007",
            "https://images.unsplash.com/photo-1716573716221-b0be1d106d81",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f"
        ],
        isNew: false,
        isSale: true,
        description: "Мощная катушка для морской рыбалки с защитой от коррозии. Выдерживает экстремальные нагрузки при вываживании крупной рыбы. Водонепроницаемый корпус.",
        features: [
            "Количество подшипников: 6+1 (нержавеющая сталь)",
            "Передаточное число: 4.2:1",
            "Вес: 690 грамм",
            "Максимальное тяговое усилие: 15 кг",
            "Защита от соленой воды"
        ],
        stock: 6
    },
    {
        id: 22,
        name: "Инерционная катушка ClassicReel",
        categoryId: 2,
        categoryName: "Катушки",
        price: 1999,
        oldPrice: null,
        rating: 4,
        
        image: "https://avatars.mds.yandex.net/get-mpic/5232043/img_id4878829664950865203.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/5232043/img_id4878829664950865203.jpeg/orig",
            "https://images.unsplash.com/photo-1727510226428-da71a8ed1534",
            "https://images.unsplash.com/photo-1684495598276-453d74f4d96f"
        ],
        isNew: true,
        isSale: false,
        description: "Классическая инерционная катушка с боковым тормозом. Подходит для поплавочной ловли и легкого спиннинга. Изготовлена из легкого и прочного алюминиевого сплава.",
        features: [
            "Материал: алюминиевый сплав",
            "Диаметр: 80 мм",
            "Вес: 140 грамм",
            "Тип тормоза: дисковый",
            "Подшипники: 2"
        ],
        stock: 15
    },
    
    // Новые товары для категории 3 (Приманки)
    {
        id: 23,
        name: "Блесны вращающиеся SpinMaster (8 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 1299,
        oldPrice: 1599,
        
        
        image: "https://cdn1.ozone.ru/s3/multimedia-j/6331944427.jpg",
        images: [
            "https://cdn1.ozone.ru/s3/multimedia-j/6331944427.jpg",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5",
            "https://images.unsplash.com/photo-1597840538983-028cdcfb942e"
        ],
        isNew: false,
        isSale: true,
        description: "Набор вращающихся блесен разных цветов для ловли щуки, окуня и форели. Хорошо работают как на течении, так и в стоячей воде.",
        features: [
            "Количество в наборе: 8 шт",
            "Размеры: №1-№3",
            "Материал лепестка: латунь",
            "Покрытие: никель/медь/золото",
            "Крючки: VMC"
        ],
        stock: 22
    },
    {
        id: 24,
        name: "Колеблющиеся блесны PikeMaster (5 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 899,
        oldPrice: null,
        
        
        image: "https://sedobka.ru/wp-content/uploads/content_img/2_1006/rodio_craft_noa.jpg",
        images: [
            "https://sedobka.ru/wp-content/uploads/content_img/2_1006/rodio_craft_noa.jpg",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5"
        ],
        isNew: true,
        isSale: false,
        description: "Набор колеблющихся блесен для ловли крупной щуки и судака. Имеют стабильную игру на различных скоростях проводки. Оснащены прочными тройниками.",
        features: [
            "Количество в наборе: 5 шт",
            "Размеры: от 7 до 12 см",
            "Вес: от 14 до 28 г",
            "Материал: латунь",
            "Крючки: усиленные тройники"
        ],
        stock: 13
    },
    {
        id: 25,
        name: "Мягкие приманки CrawFish (15 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 999,
        oldPrice: 1199,
        
        
        image: "https://avatars.mds.yandex.net/i?id=055818c5246779cd561dbc1c5dec8ea2_l-12208630-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=055818c5246779cd561dbc1c5dec8ea2_l-12208630-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1597840538983-028cdcfb942e",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5"
        ],
        isNew: false,
        isSale: true,
        description: "Набор силиконовых приманок в форме раков для ловли окуня, судака и щуки. Имеют реалистичную форму и движения при проводке. В комплекте разные размеры и цвета.",
        features: [
            "Количество в наборе: 15 шт",
            "Размеры: от 5 до 9 см",
            "Материал: съедобный силикон",
            "Аромат: креветка",
            "10 различных цветов"
        ],
        stock: 25
    },
    {
        id: 26,
        name: "Попперы TopWater (3 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 1499,
        oldPrice: null,
        
        
        image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a2a03379-50f1-40b4-8bf8-8c4b39e934f4.__CR96,0,2005,1240_PT0_SX970_V1___.jpg",
        images: [
            "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a2a03379-50f1-40b4-8bf8-8c4b39e934f4.__CR96,0,2005,1240_PT0_SX970_V1___.jpg",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574"
        ],
        isNew: false,
        isSale: false,
        description: "Поверхностные приманки для ловли хищника на мелководье. Создают характерные звуки и брызги на поверхности воды, привлекая хищную рыбу.",
        features: [
            "Количество в наборе: 4 шт",
            "Размеры: 7 см",
            "Вес: 12 г",
            "Тип: поверхностные",
            "Крючки: двойные Owner"
        ],
        stock: 11
    },
    {
        id: 27,
        name: "Микроджиг UltraLight (10 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 799,
        oldPrice: 999,
        
        
        image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_663f9a700e5cff68fee5fc6e_663fa7358413e76d2e886093/scale_1200",
        images: [
            "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_663f9a700e5cff68fee5fc6e_663fa7358413e76d2e886093/scale_1200",
            "https://images.unsplash.com/photo-1597840538983-028cdcfb942e",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574"
        ],
        isNew: false,
        isSale: true,
        description: "Набор микроджиговых приманок для ультралайтовой ловли окуня и форели. Включает джиг-головки и силиконовые приманки различных форм.",
        features: [
            "Количество головок: 10 шт (1-3 г)",
            "Количество силиконовых приманок: 10 шт",
            "Размеры: 2-6 см",
            "Крючки: острые японские",
            "Яркие разные расцветки"
        ],
        stock: 18
    },
    {
        id: 28,
        name: "Спиннербейты Pike Hunter (3 шт)",
        categoryId: 3,
        categoryName: "Приманки",
        price: 1799,
        oldPrice: 2199,
        
        
        image: "https://avatars.mds.yandex.net/i?id=0859bc6bb627b6e8787fda74d7228a39_l-12525508-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=0859bc6bb627b6e8787fda74d7228a39_l-12525508-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1592929043000-fbea34bc8ad5",
            "https://images.unsplash.com/photo-1604417429445-2ef33ea36574"
        ],
        isNew: true,
        isSale: true,
        description: "Набор спиннербейтов для ловли щуки в заросших водоемах. Оснащены двойниками и юбками из силикона. Яркая расцветка привлекает хищника издалека.",
        features: [
            "Количество в наборе: 3 шт",
            "Вес: 14, 21, 28 г",
            "Лепесток: комбинированный",
            "Крючки: двойники Owner",
            "Проволока: нержавеющая сталь"
        ],
        stock: 9
    },
    
    // Новые товары для категории 4 (Леска и шнуры)
    {
        id: 29,
        name: "Монофильная леска CrystalClear",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 399,
        oldPrice: 549,
        
        
        image: "https://avatars.mds.yandex.net/i?id=64267243e2d081ae0c19859a38f635fb_l-4566264-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=64267243e2d081ae0c19859a38f635fb_l-4566264-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1598909820593-c970004196f5",
            "https://images.unsplash.com/photo-1631389851191-2e3ad60220b1"
        ],
        isNew: false,
        isSale: true,
        description: "Прозрачная монофильная леска для поплавочной и фидерной ловли. Обладает хорошей прочностью и растяжимостью. Практически незаметна в воде.",
        features: [
            "Материал: нейлон",
            "Длина: 30 метров",
            "Диаметр: 0.22 мм",
            "Тест: 5.4 кг",
            "Цвет: прозрачный"
        ],
        stock: 30
    },
    {
        id: 30,
        name: "Флюорокарбоновая леска InvisibleForce",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 799,
        oldPrice: null,
        
        
        image: "https://goods-photos.static1-sima-land.com/items/7496686/0/400.jpg?v=1692629497",
        images: [
            "https://goods-photos.static1-sima-land.com/items/7496686/0/400.jpg?v=1692629497",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73",
            "https://images.unsplash.com/photo-1598909820593-c970004196f5"
        ],
        isNew: true,
        isSale: false,
        description: "Высококачественная флюорокарбоновая леска, практически невидимая в воде. Обладает высокой стойкостью к истиранию и отличной прочностью. Идеальна для ловли осторожной рыбы.",
        features: [
            "Материал: 100% флюорокарбон",
            "Длина: 100 метров",
            "Диаметр: 0.3 мм",
            "Тест: 10.6 кг",
            "Полностью невидима в воде"
        ],
        stock: 18
    },
    {
        id: 31,
        name: "Плетеный шнур UltraBraid X4",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 899,
        oldPrice: 1099,
        
        
        image: "https://cdn1.ozone.ru/s3/multimedia-j/6672595591.jpg",
        images: [
            "https://cdn1.ozone.ru/s3/multimedia-j/6672595591.jpg",
            "https://images.unsplash.com/photo-1598909820593-c970004196f5",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73"
        ],
        isNew: false,
        isSale: true,
        description: "Прочный плетеный шнур из 4 нитей. Отличается мягкостью и хорошей укладкой на шпуле. Подходит для большинства видов рыбалки.",
        features: [
            "Материал: PE волокно (4 нити)",
            "Длина: 200 метров",
            "Тест: 6.8 кг (0.12 мм)",
            "Цвет: желтый",
            "Покрытие от УФ-лучей"
        ],
        stock: 22
    },
    {
        id: 32,
        name: "Карповая леска Carp Line",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 699,
        oldPrice: null,
        
        
        image: "https://cdn1.ozone.ru/s3/multimedia-c/6639597372.jpg",
        images: [
            "https://cdn1.ozone.ru/s3/multimedia-c/6639597372.jpg",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73",
            "https://images.unsplash.com/photo-1598909820593-c970004196f5"
        ],
        isNew: false,
        isSale: false,
        description: "Специализированная леска для карповой ловли с повышенной прочностью и устойчивостью к абразивным поверхностям. Темно-зеленый цвет обеспечивает маскировку на дне.",
        features: [
            "Материал: нейлон с покрытием",
            "Длина: 300 метров",
            "Диаметр: 0.35 мм",
            "Тест: 12.7 кг",
            "Цвет: темно-зеленый"
        ],
        stock: 16
    },
    {
        id: 33,
        name: "Поводковый материал Titanium Tooth Proof",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 1199,
        oldPrice: 1399,
        
        
        image: "https://rybsnasti.ru/images/stories/virtuemart/product/sti020b-15ft.jpg",
        images: [
            "https://rybsnasti.ru/images/stories/virtuemart/product/sti020b-15ft.jpg",
            "https://images.unsplash.com/photo-1631389851191-2e3ad60220b1",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73"
        ],
        isNew: false,
        isSale: true,
        description: "Сверхпрочный поводковый материал с титановым покрытием. Устойчив к перекусам хищной рыбой. Сохраняет гибкость и не перекручивается.",
        features: [
            "Материал: стальная проволока с титановым покрытием",
            "Длина: 4.6 метров",
            "Тест: 9.1 кг",
            "Диаметр: 0.4 мм",
            "Цвет: серебристый"
        ],
        stock: 10
    },
    {
        id: 34,
        name: "Морской шнур OceanMaster",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 1999,
        oldPrice: 2499,
        
        
        image: "https://img.joomcdn.net/9b6de64e34d379df24b61a907261b4299f5fca04_1024_1024.jpeg",
        images: [
            "https://img.joomcdn.net/9b6de64e34d379df24b61a907261b4299f5fca04_1024_1024.jpeg",
            "https://images.unsplash.com/photo-1598909820593-c970004196f5",
            "https://images.unsplash.com/photo-1631389851191-2e3ad60220b1"
        ],
        isNew: false,
        isSale: true,
        description: "Сверхпрочный плетеный шнур для морской рыбалки. Устойчив к соленой воде и ультрафиолету. Предназначен для ловли крупной рыбы в экстремальных условиях.",
        features: [
            "Материал: PE волокно повышенной прочности",
            "Длина: 10 метров",
            "Тест: 36 кг (0.54 мм)",
            "Цвет: синий",
            "Защита от соленой воды"
        ],
        stock: 8
    },
    {
        id: 35,
        name: "Фидерная леска FeederPro",
        categoryId: 4,
        categoryName: "Леска и шнуры",
        price: 599,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/i?id=b25382f72f875227ac452bc1efc79e02922fb8e2-13316175-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=b25382f72f875227ac452bc1efc79e02922fb8e2-13316175-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73",
            "https://images.unsplash.com/photo-1678093469849-17a7f23e6558"
        ],
        isNew: true,
        isSale: false,
        description: "Специализированная монофильная леска для фидерной ловли. Обладает оптимальной растяжимостью для правильной подсечки. Тонущая, с минимальной памятью.",
        features: [
            "Материал: специальный полимер",
            "Длина: 150 метров",
            "Диаметр: 0.25 мм",
            "Тест: 7.55 кг",
            "Цвет: темно-зеленый"
        ],
        stock: 20
    },
    
    // Новые товары для категории 5 (Одежда)
    {
        id: 36,
        name: "Вейдерсы неопреновые ProWaders",
        categoryId: 5,
        categoryName: "Одежда",
        price: 6499,
        oldPrice: 7999,
        
        
        image: "https://cdn.skidka-msk.ru/images/prodacts/290/506/506116_neoprenovyie-veydersyi-thermo-3-mm-caperlan-8304142.jpg",
        images: [
            "https://cdn.skidka-msk.ru/images/prodacts/290/506/506116_neoprenovyie-veydersyi-thermo-3-mm-caperlan-8304142.jpg",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2",
            "https://images.unsplash.com/photo-1686599289848-68f82701ce73"
        ],
        isNew: false,
        isSale: true,
        description: "Высококачественные неопреновые вейдерсы для рыбалки в холодной воде. Утепленные, с усиленными коленями и нескользящей подошвой. Регулируемые лямки обеспечивают комфортную посадку.",
        features: [
            "Материал: неопрен 5 мм",
            "Усиленные колени и сиденье",
            "Водонепроницаемый внутренний карман",
            "Нескользящая подошва",
            "Размеры: 41-46"
        ],
        stock: 9
    },
    {
        id: 37,
        name: "Кепка с защитой шеи SunProtector",
        categoryId: 5,
        categoryName: "Одежда",
        price: 999,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/i?id=6288c8c413cea9374c5ddce93dfcf125_l-4405396-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=6288c8c413cea9374c5ddce93dfcf125_l-4405396-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d"
        ],
        isNew: true,
        isSale: false,
        description: "Кепка с отстегивающейся защитой шеи от солнца. Изготовлена из быстросохнущего материала с УФ-защитой. Идеальна для летней рыбалки и походов.",
        features: [
            "Материал: полиэстер с УФ-защитой UPF 50+",
            "Съемная защита шеи",
            "Вентиляционные отверстия",
            "Регулируемый размер",
            "Цвет: бежевый"
        ],
        stock: 25
    },
    {
        id: 38,
        name: "Термобелье Graff",
        categoryId: 5,
        categoryName: "Одежда",
        price: 3999,
        oldPrice: 4599,
        
        
        image: "https://avatars.mds.yandex.net/i?id=aea4dff1283beb9e3ef93627d1623ab9a9f8201f-5268994-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=aea4dff1283beb9e3ef93627d1623ab9a9f8201f-5268994-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d"
        ],
        isNew: false,
        isSale: true,
        description: "Комплект термобелья для рыбалки в холодное время года. Эффективно отводит влагу и сохраняет тепло. Анатомический крой обеспечивает комфорт при движении.",
        features: [
            "Материал: Polartec Power Grid",
            "Состав: в комплекте кофта и штаны",
            "Бесшовная технология",
            "Антибактериальная пропитка",
            "Размеры: S-XXL"
        ],
        stock: 12
    },
    {
        id: 39,
        name: "Перчатки рыболовные AquaGloves",
        categoryId: 5,
        categoryName: "Одежда",
        price: 1299,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/5236119/img_id1985888647443108158.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/5236119/img_id1985888647443108158.jpeg/orig",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d"
        ],
        isNew: false,
        isSale: false,
        description: "Водонепроницаемые перчатки с обрезанными пальцами для удобной работы с рыболовными снастями. Сохраняют тепло и защищают от ветра. Имеют нескользящее покрытие на ладони.",
        features: [
            "Материал: неопрен 3 мм",
            "Обрезанные пальцы (большой, указательный, средний)",
            "Нескользящее покрытие на ладони",
            "Регулируемый манжет на липучке",
            "Размеры: M-XL"
        ],
        stock: 18
    },
    {
        id: 40,
        name: "Зимний костюм IceHunter",
        categoryId: 5,
        categoryName: "Одежда",
        price: 12999,
        oldPrice: 14999,
        
        
        image: "https://images.spinningline.ru/00024421_LARGE-001.jpg",
        images: [
            "https://images.spinningline.ru/00024421_LARGE-001.jpg",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2"
        ],
        isNew: false,
        isSale: true,
        description: "Профессиональный костюм для зимней рыбалки, обеспечивающий комфорт при температуре до -30°C. Имеет плавающие свойства и множество функциональных карманов.",
        features: [
            "Материал: мембрана 20000/20000",
            "Утеплитель: Thinsulate 300 г/м²",
            "Плавающие свойства",
            "Светоотражающие элементы",
            "Усиленные колени и сиденье"
        ],
        stock: 6
    },
    {
        id: 41,
        name: "Поляризационные очки FishSight",
        categoryId: 5,
        categoryName: "Одежда",
        price: 1199,
        oldPrice: 1799,
        
        
        image: "https://avatars.mds.yandex.net/get-mpic/5280162/img_id3292233788598153035.jpeg/orig",
        images: [
            "https://avatars.mds.yandex.net/get-mpic/5280162/img_id3292233788598153035.jpeg/orig",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d"
        ],
        isNew: false,
        isSale: true,
        description: "Специализированные поляризационные очки для рыбалки, устраняющие блики от воды и позволяющие лучше видеть под водой. Легкая и прочная рамка из композитного материала.",
        features: [
            "Линзы: поляризационные TAC",
            "Защита от УФ: 100% (UV400)",
            "Материал оправы: TR90",
            "Плавающая конструкция",
            "В комплекте жесткий чехол и салфетка"
        ],
        stock: 15
    },
    {
        id: 42,
        name: "Забродные ботинки GravelWalker",
        categoryId: 5,
        categoryName: "Одежда",
        price: 4999,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/i?id=95b77b8d7d2988074bd0812a533db31ba1f3a1d2-5221602-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=95b77b8d7d2988074bd0812a533db31ba1f3a1d2-5221602-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1690310456424-5e37b185464d",
            "https://images.unsplash.com/photo-1717397040954-ba0707c981c2"
        ],
        isNew: true,
        isSale: false,
        description: "Профессиональные забродные ботинки для рыбалки в горных реках и на каменистом дне. Имеют прочную подошву с хорошим сцеплением и быстросохнущий верх.",
        features: [
            "Материал верха: синтетическая кожа и сетка",
            "Подошва: Vibram с резиновыми шипами",
            "Быстросохнущий материал",
            "Усиленный носок и пятка",
            "Размеры: 40-46"
        ],
        stock: 10
    },
    
    // Новые товары для категории 6 (Аксессуары)
    {
        id: 43,
        name: "Рыболовная сумка TackleOrganizer",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 2499,
        oldPrice: 2999,
        
        
        image: "https://m.media-amazon.com/images/I/91WaHA1oxgL._AC_UL960_QL65_.jpg",
        images: [
            "https://m.media-amazon.com/images/I/91WaHA1oxgL._AC_UL960_QL65_.jpg",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba",
            "https://images.unsplash.com/photo-1688227027071-84d4452ba5c2"
        ],
        isNew: false,
        isSale: true,
        description: "Многофункциональная сумка для хранения и транспортировки рыболовных снастей. Имеет множество карманов и отделений для организованного хранения. Водостойкий материал защищает содержимое от влаги.",
        features: [
            "Размеры: 40 x 25 x 30 см",
            "Материал: прочный полиэстер 1200D",
            "Водостойкое покрытие",
            "Усиленные ручки и плечевой ремень",
            "4 внешних кармана и 6 внутренних отделений"
        ],
        stock: 18
    },
    {
        id: 44,
        name: "Набор рыболовных инструментов ProTools",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 1899,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/i?id=eff5ee3401e38ab06ee4945869ba0202_l-12609997-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=eff5ee3401e38ab06ee4945869ba0202_l-12609997-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2"
        ],
        isNew: true,
        isSale: false,
        description: "Комплект необходимых инструментов для рыбалки, включающий пассатижи, кусачки, экстрактор крючков, рыболовные ножницы, зевник и другие полезные инструменты. Поставляется в компактном чехле.",
        features: [
            "Состав набора: 7 предметов",
            "Материал: нержавеющая сталь",
            "Прорезиненные рукоятки",
            "Компактный чехол с креплением на пояс",
            "Общий вес: 350 г"
        ],
        stock: 11
    },
    {
        id: 45,
        name: "Коробка для приманок LureBox",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 799,
        oldPrice: 999,
        
        
        image: "https://avatars.mds.yandex.net/i?id=14108b18ae28b4dbb43c266b66aa20aa_l-12322214-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=14108b18ae28b4dbb43c266b66aa20aa_l-12322214-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2"
        ],
        isNew: false,
        isSale: true,
        description: "Двусторонняя коробка для хранения рыболовных приманок с регулируемыми отделениями. Прозрачная крышка позволяет видеть содержимое. Надежные защелки предотвращают случайное открытие.",
        features: [
            "Размеры: 27 x 18 x 5 см",
            "Материал: ударопрочный пластик",
            "Количество отделений: до 26 (регулируемые)",
            "Водонепроницаемые защелки",
            "Дренажные отверстия"
        ],
        stock: 25
    },
    {
        id: 46,
        name: "Кресло рыболовное Comfort Pro",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 4999,
        oldPrice: 5799,
        
        
        image: "https://avatars.mds.yandex.net/i?id=c3b0bc8956df30505937593e4e7c9c0e_l-9985849-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=c3b0bc8956df30505937593e4e7c9c0e_l-9985849-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba"
        ],
        isNew: false,
        isSale: true,
        description: "Комфортное складное кресло для длительной рыбалки с регулируемыми ножками и спинкой. Имеет съемные подлокотники и держатель для удочки. Выдерживает нагрузку до 150 кг.",
        features: [
            "Материал каркаса: алюминий",
            "Материал сиденья: прочный полиэстер 600D",
            "Грузоподъемность: 150 кг",
            "Регулируемые ножки и спинка",
            "Вес: 4.5 кг"
        ],
        stock: 8
    },
    {
        id: 47,
        name: "Весы рыболовные электронные DigiScale",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 1499,
        oldPrice: null,
        
        
        image: "https://avatars.mds.yandex.net/i?id=64dc361130cbdb0ffc0141ab425510f7_l-4033047-images-thumbs&n=13",
        images: [
            "https://avatars.mds.yandex.net/i?id=64dc361130cbdb0ffc0141ab425510f7_l-4033047-images-thumbs&n=13",
            "https://images.unsplash.com/photo-1625027588969-8c30887f52ba",
            "https://images.unsplash.com/photo-1688227027071-84d4452ba5c2"
        ],
        isNew: false,
        isSale: false,
        description: "Точные электронные весы для взвешивания рыбы. Оснащены ЖК-дисплеем с подсветкой и функцией памяти. Встроенная рулетка для измерения длины рыбы.",
        features: [
            "Максимальная нагрузка: 50 кг",
            "Точность: 10 г",
            "Встроенная рулетка: 1 м",
            "Питание: 2 батарейки AAA",
            "Водонепроницаемый корпус"
        ],
        stock: 13
    },
    {
        id: 48,
        name: "Палатка рыболовная FishingTent",
        categoryId: 6,
        categoryName: "Аксессуары",
        price: 6999,
        oldPrice: 7999,
        
        
        image: "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/hkMAAOSwIO1hvJaX/$_10.JPG?set_id=880000500F",
        images: [
            "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/hkMAAOSwIO1hvJaX/$_10.JPG?set_id=880000500F",
            "https://images.unsplash.com/photo-1682113196735-cdfcf704415c",
            "https://images.unsplash.com/photo-1701861280260-81846128aab2"
        ],
        isNew: true,
        isSale: true,
        description: "Водонепроницаемая палатка для комфортной рыбалки в любую погоду. Быстро устанавливается одним человеком. Имеет москитные сетки и прозрачные окна. Подходит для длительных рыболовных сессий.",
        features: [
            "Размеры: 250 x 250 x 170 см",
            "Материал: полиэстер 210D с водостойким покрытием",
            "Водостойкость: 3000 мм",
            "Вес: 5.8 кг",
            "Количество мест: 2-3"
        ],
        stock: 7
    }
];

// Featured products (ids of products to be displayed on homepage)
const featuredProductIds = [1, 3, 5, 7, 8, 9];

// js/products.js

// Function to add a new product to the database via a POST request
function addProduct(name, price, description, imageUrl) {
  const newProduct = { name, price, description, imageUrl };  // Product data

  fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Specify that we're sending JSON
    },
    body: JSON.stringify(newProduct),  // Convert the object to JSON string
  })
    .then(response => {
      if (!response.ok) {
        // If the response status is not OK (not 2xx)
        throw new Error('Failed to add product');
      }
      return response.json();  // Parse the JSON response
    })
    .then(data => {
      console.log('Product added:', data);  // Log the added product
    })
    .catch(error => {
      console.error('Error:', error);  // Handle any errors
    });
}

// Export for Node.js (only if module exists)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
