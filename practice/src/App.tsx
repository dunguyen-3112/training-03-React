import { FONT_SIZE_400, FONT_SIZE_700, FONT_WEIGHT } from './types';

import { Text } from './components/text';

function App(): JSX.Element {
    return (
        <div className="App">
            <Text
                type="p"
                size={{
                    fontSize: FONT_SIZE_400.FONT_SIZE_16,
                    fontWeight: FONT_WEIGHT.FONT_WEIGHT_400,
                }}
            >
                Hello
            </Text>

            <Text type="p">Hello</Text>
            <Text
                type="p"
                size={{
                    fontSize: FONT_SIZE_700.FONT_SIZE_19,
                    fontWeight: FONT_WEIGHT.FONT_WEIGHT_700,
                }}
            >
                Hello 1
            </Text>
        </div>
    );
}

export default App;
