#Блок b-button
Используется для создания различных типов кнопок.
##Обзор блока
###Модификаторы блока

| Модификатор   | Допустимые значения | Описание |
| ------------- | -----------------  | --------
| [theme](#theme) | `black`, `arrow`, `light`, `red` | Стилевое оформление.  |
|[locked](#locked)| `true` | Не активное состояние. Используется для кнопок с модификатором `theme` в значении `black` и `light`.
|[centred](#centred)| `true` | Расположение кнопки по центру контейнера. Используется для кнопок с модификатором `theme`: `light`, `black`, `arrow`
|[width](#width)| `available` | Растягивает кнопку на всю ширину контейнера. Используется со всеми доступными темами

###Специализированные поля блока
| Поле | Тип | Описание |
| ---- | --- | -------- |
| [type](#type) | `String` | Поведение кнопки. По умолчанию `button` |

##Описание блока
Блок `b-button` предоставляет возможность изменять состояние кнопок, их поведение и внешний вид.
Без темы не используется.

###Модификаторы блока
<a name="theme"></a>
####Модификатор `theme`

Допустимые значения: `black`, `arrow`, `light`, `red`.<br/>
  
**black**
<br/>
Желательно эту тему всегда использовать с модификатором `reset-margin`. Т.к тема по умолчание несет в себе `40px`
отступ с верху

```bemjson
{
    block: 'd-sample-set',
    mods: { split: 'br' },
    content: [
        {
            block: 'b-button',
            mods: { 'theme': 'black', 'reset-margin': true },
            content: 'Простейшая кнопка'
        },
        {
            block: 'b-button',
            mods: { 'theme': 'black', 'reset-margin': true,  locked: true },
            content: 'Заблокированная простейшая кнопка'
        }
    ]
}
```

**arrow**
<br/>
Свернуть/Развернуть
```bemjson
{
    block: 'd-sample-set',
    mods: { split: 'br' },
    content: [
        {
            block: 'b-button',
            mods: { 'theme': 'arrow' },
            content: 'Развернуть'
        }, 
        {
            block: 'b-button',
            mods: { 'theme': 'arrow', active: true },
            content: 'Свернуть'
        }
    ]
}
```

**light**
<br/>
Серая кнопка
```bemjson
{
    block: 'd-sample-set',
    mods: { split: 'br' },
    content: [
        {
            block: 'b-button',
            mods: { 'theme': 'light' },
            content: 'Серая кнопка'
        },
        {
            block: 'b-button',
            mods: { 'theme': 'light', locked: true },
            content: 'Заблокированная серая кнопка'
        }
    ]
}
```

**red**
<br/>
Красная кнопка
```bemjson
{
    block: 'b-button',
    mods: { 'theme': 'red' },
    content: 'Красная кнопка'
}
```

<a name="locked"></a>
####Модификатор `locked`
Допустимые значения: `true`.<br/>
Используется только вместе с темой `black`, `light`

```bemjson
{
    block: 'b-button',
    mods: { 'theme': 'black', 'reset-margin': true,  locked: true },
    content: 'Заблокированная черная кнопка'
}
```


<a name="centred"></a>
####Модификатор `centred`
Допустимые значения: `true`.<br/>
Используется только вместе с темой `light`, `black`, `arrow`

```bemjson
{
    block: 'b-button',
    mods: { 'theme': 'light', centred: true },
    content: 'Кнопка по центру'
}
```

<a name="width"></a>
####Модификатор `width`
Допустимые значения: `available`.
<br/>
Используется cо всеми темами.

```bemjson
{
    block: 'd-sample-set',
    mods: { split: 'br' },
    content: [
        {
            block: 'b-button',
            mods: { 'theme': 'light', width: 'available' },
            content: 'Кнопка на всю ширину'
        },
        {
            block: 'b-button',
            mods: { 'theme': 'black', width: 'available', 'reset-margin': true },
            content: 'Кнопка на всю ширину'
        },
        {
            block: 'b-button',
            mods: { 'theme': 'red', width: 'available' },
            content: 'Кнопка на всю ширину'
        }
    ]
}
```


 