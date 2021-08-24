export const createStackScreensMap = (children: any) => {
    const stackScreensMap: {[key: string]: any} = {};

    children.map((stack: any) => {
        stackScreensMap[stack.props.name] = stack;
    })

    return stackScreensMap;
}