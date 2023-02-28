import BlueColor from '../assets/img/colors/blue.svg'
import RedColor from '../assets/img/colors/red.svg'
import WhiteColor from '../assets/img/colors/white.svg'
import YellowColor from '../assets/img/colors/yellow.svg'
import BlackColor from '../assets/img/colors/black.svg'
import GreenColor from '../assets/img/colors/green.svg'
import OrangeColor from '../assets/img/colors/orange.svg'
import PurpleColor from '../assets/img/colors/purple.svg'

const colorIcons = {
    Blue: BlueColor,
    Red: RedColor,
    Yellow: YellowColor,
    White: WhiteColor,
    Black: BlackColor,
    Green: GreenColor,
    Orange: OrangeColor,
    Purple: PurpleColor,
}

export default {
    colorIcons,
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
            type: 'first_team'
        },
        {
            id: 2,
            name: 'Команда №2',
            type: 'second_team'
        }
    ],
    colors: [
        {
            id: 0,
            name: 'colors.Blue',
            value: 'Blue',
            iconSrc: colorIcons.Blue,
        },
        {
            id: 1,
            name: 'colors.Red',
            value: 'Red',
            iconSrc: colorIcons.Red,
        },
        {
            id: 3,
            name: 'colors.Yellow',
            value: 'Yellow',
            iconSrc: colorIcons.Yellow,
        },
        {
            id: 4,
            name: 'colors.White',
            value: 'White',
            iconSrc: colorIcons.White,
        },
        {
            id: 5,
            name: 'colors.Black',
            value: 'Black',
            iconSrc: colorIcons.Black,
        },
        {
            id: 6,
            name: 'colors.Green',
            value: 'Green',
            iconSrc: colorIcons.Green,
        },
        {
            id: 7,
            name: 'colors.Orange',
            value: 'Orange',
            iconSrc: colorIcons.Orange,
        },
        {
            id: 8,
            name: 'colors.Purple',
            value: 'Purple',
            iconSrc: colorIcons.Purple,
        },
    ]
}