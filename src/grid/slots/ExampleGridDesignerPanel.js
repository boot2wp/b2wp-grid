import PluginGridDesignerPanel from './PluginGridDesignerPanel';

export const ExampleGridDesignerPanel = ({ attributes, setAttributes, title }) => {
    return (
        <PluginGridDesignerPanel
            title={title}
        >
            Example Designer Panel: attributes.gridName is {attributes.gridName}
        </PluginGridDesignerPanel>
    )
}