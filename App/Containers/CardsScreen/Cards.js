import React from 'react'
import { Text, View, FlatList, TextInput, Picker, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import Spinkit from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { getIdols, getSchools, getSkills, getSubunits } from '../../Stores/CachedData/Selectors'
import SquareButton from '../../Components/SquareButton/SquareButton'
import CardItem from '../../Components/CardItem/CardItem'
import PromoCardRow from '../../Components/PromoCardRow/PromoCardRow'
import SpecialCardRow from '../../Components/SpecialCardRow/SpecialCardRow'
import EventCardRow from '../../Components/EventCardRow/EventCardRow'
import RegionRow from '../../Components/RegionRow/RegionRow'
import MainUnitRow from '../../Components/MainUnitRow/MainUnitRow'
import YearRow from '../../Components/YearRow/YearRow'
import RarityRow from '../../Components/RarityRow/RarityRow'
import AttributeRow from '../../Components/AttributeRow/AttributeRow'
import SubUnitRow from '../../Components/SubUnitRow/SubUnitRow'
import IdolNameRow from '../../Components/IdolNameRow/IdolNameRow'
import { LLSIFService } from '../../Services/LLSIFService'
import CardListActions from '../../Stores/CardList/Actions'
import { Colors, ApplicationStyles, Images } from '../../Theme'
import styles from './styles'
import SchoolRow from '../../Components/SchoolRow/SchoolRow';
import SkillRow from '../../Components/SkillRow/SkillRow';

const PickerItem = Picker.Item
const defaultFilter = {
  ordering: '-release_date',
  page_size: 20,
  page: 1,
  name: 'All',
  rarity: '',
  attribute: '',
  japan_only: '',
  is_promo: '',
  is_special: '',
  is_event: '',
  skill: 'All',
  idol_main_unit: '',
  idol_sub_unit: 'All',
  idol_school: 'All',
  idol_year: ''
}

/**
 *Màn hình danh sách card
 *
 * @class CardsScreen
 * @extends {React.PureComponent}
 */
class CardsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      isFilter: false,
      ordering: '-release_date',
      page_size: 20,
      page: 1,
      name: 'All',
      rarity: '',
      attribute: '',
      japan_only: '',
      is_promo: '',
      is_special: '',
      is_event: '',
      skill: 'All',
      idol_main_unit: '',
      idol_sub_unit: 'All',
      idol_school: 'All',
      idol_year: ''
    }
    this._onEndReached = _.debounce(this._onEndReached, 1000)
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='ios-photos' size={30} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Cards',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  /**
   * Key extractor
   *
   * @memberof CardsScreen
   */
  _keyExtractor = (item, index) => `card ${item.id}`

  /**
   * Render item trong FlatList
   *
   * @memberof CardsScreen
   */
  _renderItem = ({ item }) => <CardItem item={item} onPress={this.navigateToCardDetail(item)} />

  /**
   * Chuyển đến trang thông tin card
   *
   * @param {Object} item Thông tin của card đó
   * @memberof CardsScreen
   */
  navigateToCardDetail = (item) => () => this.props.navigation.navigate('CardDetailScreen', { item: item })

  /**
   * Lấy danh sách card
   *
   * @memberof CardsScreen
   */
  getCards() {
    // console.log(`========== Cards.getCards.page ${this.state.filter.page} ==========`)
    let _skill = this.state.skill
    let _name = this.state.name
    let _sub_unit = this.state.idol_sub_unit
    let _school = this.state.idol_school
    let _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: this.state.page,
      name: _name === 'All' ? '' : _name,
      rarity: this.state.rarity,
      attribute: this.state.attribute,
      japan_only: this.state.japan_only,
      is_promo: this.state.is_promo,
      is_special: this.state.is_special,
      is_event: this.state.is_event,
      skill: _skill === 'All' ? '' : _skill,
      idol_main_unit: this.state.idol_main_unit,
      idol_sub_unit: _sub_unit === 'All' ? '' : _sub_unit,
      idol_school: _school === 'All' ? '' : _school,
      idol_year: this.state.idol_year
    }
    LLSIFService.fetchCardList(_filter).then((result) => {
      result.sort((a, b) => {
        return a.id < b.id
      })
      var x = [...this.state.data, ...result]
      x = x.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.id === thing.id
        ))
      )

      this.setState({
        data: x,
        isLoading: false,
        page: this.state.page + 1
      })
    }).catch((err) => {
      //  TODO
    })
  }

  /**
   * Khi scroll đến cuối danh sách
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    this.getCards()
    // let _filter = {
    //   ordering: this.state.ordering,
    //   page_size: this.state.page_size,
    //   page: this.state.page,
    //   name: this.state.name,
    //   rarity: this.state.rarity,
    //   attribute: this.state.attribute,
    //   // japan_only: 'on',
    //   is_promo: this.state.is_promo,
    //   is_special: this.state.is_special,
    //   is_event: this.state.is_event,
    //   skill: this.state.skill,
    //   idol_main_unit: this.state.idol_main_unit,
    //   idol_sub_unit: this.state.idol_sub_unit,
    //   idol_school: this.state.idol_school,
    //   idol_year: this.state.idol_year
    // }
    // this.setState({
    //   isLoading: false
    // })
    // this.props.fetchCardList(filter)
  }

  componentDidMount() {
    this.getCards()
  }

  /**
   * Bật tắt bộ lọc
   *
   * @memberof CardsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter })

  /**
   * Tìm kiếm theo bộ lọc
   *
   * @memberof CardsScreen
   */
  onSearch = () => {
    // this.setState({ data: [], page: 1, isFilter: false })
    // console.log(`========= Cards.onSearch: ${_filter} =========`)
    // this.getCards()
    Alert.alert('onSearch', `ordering: ${this.state.ordering},
      page_size: ${this.state.page_size},
      page: ${this.state.page},
      name: ${this.state.name},
      rarity: ${this.state.rarity},
      attribute: ${this.state.attribute},
      japan_only: ${this.state.japan_only},
      is_promo: ${this.state.is_promo},
      is_special: ${this.state.is_special},
      is_event: ${this.state.is_event},
      skill: ${this.state.skill},
      idol_main_unit: ${this.state.idol_main_unit},
      idol_sub_unit: ${this.state.idol_sub_unit},
      idol_school: ${this.state.idol_school},
      idol_year: ${this.state.idol_year}`)
  }

  /**
   * Lưu is_promo
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectPromo = (value) => () => this.setState({ is_promo: value })

  /**
   * Lưu is_special
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectSpecial = (value) => () => this.setState({ is_special: value })

  /**
   * Lưu is_event
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectEvent = (value) => () => this.setState({ is_event: value })

  /**
   * Lưu idol_main_unit
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectMainUnit = (value) => () => this.setState({ idol_main_unit: value })

  /**
   * Lưu rarity
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRarity = (value) => () => this.setState({ rarity: value })

  /**
   * Lưu attribute
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectAttribute = (value) => () => this.setState({ attribute: value })

  /**
   * Lưu idol_year
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectYear = (value) => () => this.setState({ idol_year: value })

  /**
   * Lưu idol_sub_unit
   *
   * @memberof CardsScreen
   */
  selectSubUnit = (itemValue, itemIndex) => this.setState({ idol_sub_unit: itemValue })

  /**
   * Lưu name
   *
   * @memberof CardsScreen
   */
  selectIdol = (itemValue, itemIndex) => this.setState({ name: itemValue })

  /**
   * Lưu school
   *
   * @memberof CardsScreen
   */
  selectSchool = (itemValue, itemIndex) => this.setState({ idol_school: itemValue })

  selectSkill = (itemValue, itemIndex) => this.setState({ skill: itemValue })

  selectRegion = (item) => () => this.setState({ japan_only: item })

  resetFilter = () => {
    this.setState({
      name: defaultFilter.name,
      rarity: defaultFilter.rarity,
      attribute: defaultFilter.attribute,
      japan_only: defaultFilter.japan_only,
      is_promo: defaultFilter.is_promo,
      is_special: defaultFilter.is_special,
      is_event: defaultFilter.is_event,
      skill: defaultFilter.skill,
      idol_main_unit: defaultFilter.idol_main_unit,
      idol_sub_unit: defaultFilter.idol_sub_unit,
      idol_school: defaultFilter.idol_school,
      idol_year: defaultFilter.idol_year
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[ApplicationStyles.header, styles.header]}>
          <TextInput style={{ flex: 1, borderColor: '#333', borderWidth: 1.5, margin: 6 }} />
          <SquareButton name={'ios-search'} onPress={this.onSearch} />
          <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
        </View>

        {/* FILTER */}
        {this.state.isFilter &&
          <View style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
            <IdolNameRow name={this.state.name} selectIdol={this.selectIdol} />
            <RarityRow rarity={this.state.rarity} selectRarity={this.selectRarity} />
            <AttributeRow attribute={this.state.attribute} selectAttribute={this.selectAttribute} />
            <RegionRow japan_only={this.state.japan_only} selectRegion={this.selectRegion} />
            <PromoCardRow is_promo={this.state.is_promo} selectPromo={this.selectPromo} />
            <SpecialCardRow is_special={this.state.is_special} selectSpecial={this.selectSpecial} />
            <EventCardRow is_event={this.state.is_event} selectEvent={this.selectEvent} />
            <SkillRow skill={this.state.skill} selectSkill={this.selectSkill} />
            <MainUnitRow idol_main_unit={this.state.idol_main_unit} selectMainUnit={this.selectMainUnit} />
            <SubUnitRow idol_sub_unit={this.state.idol_sub_unit} selectSubUnit={this.selectSubUnit} />
            <SchoolRow idol_school={this.state.idol_school} selectSchool={this.selectSchool} />
            <YearRow idol_year={this.state.idol_year} selectYear={this.selectYear} />

            {/* RESET BUTTON */}
            <View style={{ alignItems: 'stretch' }}>
              <TouchableOpacity onPress={this.resetFilter}
                style={styles.resetButton}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

        {/* CARD LIST */}
        <FlatList
          data={this.state.data}
          numColumns={2}
          initialNumToRender={8}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          style={styles.list}
          ListFooterComponent={<View style={[ApplicationStyles.center, { margin: 10 }]}>
            <Spinkit type='WanderingCubes' size={30} color='white' />
          </View>}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  /** Danh sách card */
  cards: state.cardList.get('cardList')
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen)
