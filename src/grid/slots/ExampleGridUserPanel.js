import PluginGridUserPanel from './PluginGridUserPanel';

export const ExampleGridUserPanel = ({ attributes, setAttributes, title }) => {
    return (
        <PluginGridUserPanel
            title={title}
        >
            Example User Panel: attributes.gridName is {attributes.gridName}
        </PluginGridUserPanel>
    )
}