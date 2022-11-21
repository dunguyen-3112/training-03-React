import { FONT_WEIGHT_400, FONT_WEIGHT_700 } from './types';

import { Text } from './components/text';

function App(): JSX.Element {
    return (
        <div className="App">
            <Text
                type="p"
                size={{
                    fontSize: FONT_WEIGHT_400.FONT_SIZE_16,
                    fontWeight: FONT_WEIGHT_400.VALUE,
                }}
            >
                Hello
            </Text>

            <Text type="p">Hello</Text>
            <Text
                type="p"
                size={{
                    fontSize: FONT_WEIGHT_700.FONT_SIZE_14,
                    fontWeight: FONT_WEIGHT_700.VALUE,
                }}
            >
                Hello 1
            </Text>
        </div>
    );
}

export default App;
