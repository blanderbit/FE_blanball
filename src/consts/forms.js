import BlueColor from '../assets/img/colors/blue.svg'
import RedColor from '../assets/img/colors/red.svg'
import WhiteColor from '../assets/img/colors/white.svg'
import YellowColor from '../assets/img/colors/yellow.svg'


export default {
    tabs: [
        {
            id: 1,
            text: 'Форми',
            active: true
        },
        {
            id: 2,
            text: 'Маніжки',
            active: false
        }
    ],
    teams: [
        {
            id: 1,
            name: 'Команда №1',
        },
        {
            id: 2,
            name: 'Команда №2',
        }
    ],
    colors: [
        {
            id: 0,
            name: 'Синій',
            value: 'Blue',
            iconSrc: BlueColor,
        },
        {
            id: 1,
            name: 'Червоний',
            value: 'Red',
            iconSrc: RedColor,
        },
        {
            id: 3,
            name: 'Жовтий',
            value: 'Yellow',
            iconSrc: YellowColor,
        },
        {
            id: 4,
            name: 'Жовтий',
            value: 'White',
            iconSrc: WhiteColor,
        },
        
    ]
}