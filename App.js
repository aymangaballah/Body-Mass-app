//fitness app
import * as React from "react"
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    AsyncStorage
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
const { width } = Dimensions.get("window")
export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            weight: 50,
            age: 10,
            show: false,
            input_hight: "",
            result_num: 0,
            result_text: "",
            select: 0,
            gender: "",
        }
    }
    async componentDidMount() {

        let gender_var = await AsyncStorage.getItem('gender')
        let result_var = await AsyncStorage.getItem('result')
        let Healthness_var = await AsyncStorage.getItem('Healthness')
        let age_var = await AsyncStorage.getItem('age')

        if (!gender_var && !result_var && !Healthness_var && !age_var) {
            this.setState({ show: false })
        } else {
            this.setState({
                result_num: result_var,
                result_text: Healthness_var,
                gender: gender_var,
                show: true
            })

        }
    }

    async store_date(gender_var, result_var, Healthness_var, age_var) {
        await AsyncStorage.setItem('gender', gender_var + '')
        await AsyncStorage.setItem('result', result_var + '')
        await AsyncStorage.setItem('Healthness', Healthness_var + '')
        await AsyncStorage.setItem('age' + age_var + '')
    }
    add_weight() {
        let weight_var = this.state.weight
        weight_var = weight_var + 1
        this.setState({ weight: weight_var })
    }
    minus_weight() {
        let weight_var = this.state.weight
        if (weight_var != 0) {
            weight_var = weight_var - 1
        }
        this.setState({ weight: weight_var })

    }
    add_age() {
        let age_var = this.state.age
        age_var = age_var + 1
        this.setState({ age: age_var })
    }
    minus_age() {
        let age_var = this.state.age
        if (age_var != 0) {
            age_var = age_var - 1
        }
        this.setState({ age: age_var })
    }

    resultfun() {
        let weight_var = this.state.weight
        let height_var = this.state.input_hight
        let result_num_var = this.state.result_num
        let result_text_var = this.state.result_text
        let age_var = this.state.age
        let gender_var = this.state.gender

        result_num_var = weight_var / Math.pow(height_var / 100, 2)
        let rounded_result = Math.round(result_num_var * 10) / 10

        if (result_num_var > 30 || result_num_var == 30) {
            result_text_var = "Obese"
            this.setState({ result_text: result_text_var, result_num: rounded_result })

        } if (result_num_var > 25 && result_num_var < 30) {
            result_text_var = "OverWeight"
            this.setState({ result_text: result_text_var, result_num: rounded_result })

        } if (result_num_var > 18.5 && result_num_var < 24.9) {
            result_text_var = "Normal"
            this.setState({ result_text: result_text_var, result_num: rounded_result })

        } else {
            result_text_var = "Thin"
            this.setState({ result_text: result_text_var, result_num: rounded_result })

        }
        this.store_date(gender_var, rounded_result, result_text_var, age_var)

    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={"#06C271"} barStyle="light-content" />
                {!this.state.show ? (
                    <View style={{ flex: 1, backgroundColor: '#252525' }}>
                        <View style={styles.viewHeader}>
                            <Text style={styles.text_content}>Body Mass</Text>
                        </View>

                        {/* view male and female */}

                        <View style={styles.viewMaleFemale}>
                            <TouchableOpacity style={[styles.viewMaleFemaleBtn,
                            { backgroundColor: this.state.select == 1 ? "#06C271" : "#A1F2CE", }]}
                                onPress={() => {
                                    this.setState({ select: 1, gender: 'Male' })
                                }}
                            >
                                <MaterialCommunityIcons name="gender-male" size={50} color={"#fff"} />
                                <Text style={styles.text_content}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.viewMaleFemaleBtn,
                            { backgroundColor: this.state.select == 2 ? "#06C271" : "#A1F2CE", }]}

                                onPress={() => {
                                    this.setState({ select: 2, gender: "Female" })
                                }}
                            >
                                <MaterialCommunityIcons name="gender-female" size={50} color={"#fff"} />
                                <Text style={styles.text_content}>Female</Text>
                            </TouchableOpacity>

                        </View>

                        {/* view hight */}

                        <View style={styles.View_hight}>
                            <Text style={styles.text_content}>Height</Text>
                            <View style={styles.containerTextinput}>
                                <TextInput
                                    style={styles.textinputHeight}
                                    value={this.state.input_hight}
                                    onChangeText={(data) => {
                                        this.setState({ input_hight: data })
                                    }}
                                    keyboardType="decimal-pad"
                                    maxLength={3}

                                />
                                <Text style={[styles.text_content, { alignSelf: 'center' }]}>CM</Text>
                            </View>
                        </View>

                        {/* view weight and age */}

                        <View style={styles.viewMaleFemale}>

                            <View style={styles.wieght_age_view}>

                                <Text style={styles.text_content}>Weight</Text>

                                <Text style={[styles.text_content, { color: '#fff' }]}>{this.state.weight}</Text>

                                <View style={styles.plus_minus_container}>
                                    <TouchableOpacity style={styles.minus_plus_btn}
                                        onPress={() => {
                                            this.minus_weight()
                                        }}
                                    >
                                        <FontAwesome5 name={"minus"} size={20} color={"#fff"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.minus_plus_btn}
                                        onPress={() => {
                                            this.add_weight()
                                        }}
                                    >
                                        <FontAwesome5 name={"plus"} size={20} color={"#fff"} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.wieght_age_view}>
                                <Text style={styles.text_content}>Age</Text>
                                <Text style={[styles.text_content, { color: '#fff' }]}>{this.state.age}</Text>
                                <View style={styles.plus_minus_container}>
                                    <TouchableOpacity style={styles.minus_plus_btn}
                                        onPress={() => {
                                            this.minus_age()
                                        }}
                                    >
                                        <FontAwesome5 name={"minus"} size={20} color={"#fff"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.minus_plus_btn}
                                        onPress={() => {
                                            this.add_age()
                                        }}
                                    >
                                        <FontAwesome5 name={"plus"} size={20} color={"#fff"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.view_calulateBtn}
                            onPress={() => {
                                this.setState({ show: true })
                                this.resultfun()

                            }}
                        >
                            <Text style={styles.text_content}>Calculate</Text>
                        </TouchableOpacity>

                    </View>
                ) :
                    (
                        <View style={{ flex: 1, backgroundColor: '#252525', alignItems: 'center' }}>
                            <View style={[styles.viewHeader, {
                                justifyContent: 'flex-start', flexDirection: 'row'
                            }]}>
                                <TouchableOpacity style={styles.backBtn}
                                    onPress={() => {
                                        this.setState({ show: false })
                                    }}>
                                    <FontAwesome5 name="angle-left" size={28}  />
                                </TouchableOpacity>
                                <Text style={styles.text_content}>Result</Text>
                            </View>
                            <View style={styles.viewItemResultPage}>

                                <Text style={styles.text_page2}> {this.state.gender}</Text>
                                <MaterialCommunityIcons
                                    name={this.state.select == 1 ? "gender-male" : "gender-female"}
                                    size={70} color={"#fff"} />
                            </View>
                            <View style={styles.viewItemResultPage}>
                                <Text style={styles.text_page2}>Result</Text>
                                <Text style={styles.text_page2}> {this.state.result_num}</Text>
                            </View>
                            <View style={styles.viewItemResultPage}>
                                <Text style={styles.text_page2}>Healthness</Text>
                                <Text style={styles.text_page2}> {this.state.result_text}</Text>
                            </View>
                            <View style={styles.viewItemResultPage}>
                                <Text style={styles.text_page2}>Age</Text>
                                <Text style={styles.text_page2}> {this.state.age}</Text>
                            </View>
                            <TouchableOpacity style={[styles.viewItemResultPage,
                            {height:70,backgroundColor:'#2BDE8E',marginTop:30}]}
                            onPress={() => {
                                this.setState({ show: false })

                            }}
                        >
                            <Text style={styles.text_content}>Calculate Another Data </Text>
                        </TouchableOpacity>
                        </View>
                    )
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    viewHeader: {
        width: width,
        height: 70,
        backgroundColor: '#06C271',
        alignItems: 'center',
        justifyContent: 'center',

    },
    viewMaleFemale: {
        width: width * 0.9,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginVertical: 20
    },
    viewMaleFemaleBtn: {
        width: width / 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 30
    },
    View_hight: {
        width: width * 0.8,
        height: 150,
        backgroundColor: '#A1F2CE',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 30,
        borderRadius: 15,
    },
    containerTextinput: {
        width: 100,
        height: 40,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    textinputHeight: {
        width: 60,
        backgroundColor: '#06C271',
        paddingLeft: 10,
        color: '#fff',
        fontSize: 19,
        borderRadius: 15,
    },
    text_content: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#0e0e0e'
    },
    text_page2: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    wieght_age_view: {
        width: width / 3,
        backgroundColor: '#A1F2CE',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 15
    },
    plus_minus_container: {
        width: 100,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
    },
    minus_plus_btn: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: '#06C271',
        alignItems: 'center',
        justifyContent: 'center'
    },
    view_calulateBtn: {
        width: width * .8,
        height: 70,
        backgroundColor: '#06C271',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 15

    },
    backBtn: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 90
    },
    viewItemResultPage: {
        width: width * 0.9,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#06C271",
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

})
