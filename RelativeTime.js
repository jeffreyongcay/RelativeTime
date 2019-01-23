
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
export class RelativeTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            full_format: false,
            heartbeat_ms: 10000
        }
    }

    startHeartbeat = () => {
        this.setState({
            timer: setTimeout(() => {
                this.pushTime();
            }, this.state.heartbeat_ms)
        });
    }

    pushTime = () => {
        this.forceUpdate();
        this.startHeartbeat();
    }

    componentDidMount() {
        this.startHeartbeat();
    }

    componentWillUnmount() {
        clearTimeout(this.state.timer);
    }

    changeFormat = () => {
        let ff = this.state.full_format;
        this.setState({ full_format: ff ? false : true });
    }

    render() {
        const { time, plain, text_style, labelStart, labelEnd } = this.props;
        return (
            <TouchableOpacity onPress={() => { this.changeFormat() }}>
                <View>
                    <Text style={text_style}>
                        {
                            labelStart
                        }
                        {
                            this.state.full_format || plain ? moment(time).format("MMM DD, YYYY [at] h:mm A") : moment(time).fromNow()
                        }
                        {
                            labelEnd
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
