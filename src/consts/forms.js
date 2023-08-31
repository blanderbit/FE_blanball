import BlueColor from '@images/colors/blue.svg';
import RedColor from '@images/colors/red.svg';
import WhiteColor from '@images/colors/white.svg';
import YellowColor from '@images/colors/yellow.svg';
import BlackColor from '@images/colors/black.svg';
import GreenColor from '@images/colors/green.svg';
import OrangeColor from '@images/colors/orange.svg';
import PurpleColor from '@images/colors/purple.svg';
import { i18n } from '@plugins/i18n.plugin'

const colorIcons = {
  Blue: BlueColor,
  Red: RedColor,
  Yellow: YellowColor,
  White: WhiteColor,
  Black: BlackColor,
  Green: GreenColor,
  Orange: OrangeColor,
  Purple: PurpleColor,
};

export default {
  colorIcons,
  tabs: [
    {
      id: 1,
      text: i18n.global.t('uniforms'),
      active: true,
    },
    {
      id: 2,
      text: i18n.global.t('bibs'),
      active: false,
    },
  ],
  teams: [
    {
      id: 1,
      name: i18n.global.t('team_1'),
      type: 'first_team',
    },
    {
      id: 2,
      name: i18n.global.t('team_2'),
      type: 'second_team',
    },
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
  ],
};
