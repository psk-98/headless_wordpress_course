import BlockRenderer from "components/BlockRenderer/BlockRenderer"
import MainMenu from "components/MainMenu/MainMenu"

export default function Page(props) {
  return (
    <div>
      {console.log("PROPS", props)}
      <MainMenu
        items={props.mainMenuItems}
        callToActionLabel={props.callToActionLabel}
        callToActionDestination={props.callToActionDestination}
      />
      <BlockRenderer blocks={props.blocks} />
    </div>
  )
}
