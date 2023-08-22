import CallToActionButton from "components/CallToActionButton/CallToActionButton"
import Column from "components/Column/Column"
import Columns from "components/Columns/Columns"
import FormspreeForm from "components/FormspreeForm/FormspreeForm"
import Heading from "components/Heading/Heading"
import Paragraph from "components/Paragraph/Paragraph"
import PropertySearch from "components/PropertySearch/PropertySearch"
import Cover from "components/cover/Cover"
import Image from "next/image"
import { theme } from "utils/theme"

export default function BlockRenderer({ blocks }) {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/formspreeform": {
        return (
          <FormspreeForm
            key={block.id}
            formId={block.attributes.data.form_id}
          />
        )
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        )
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            content={block.attributes.content}
            textAlign={block.attributes.align}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        )
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
            content={block.attributes.content}
          />
        )
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            stackOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes.width}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        )
      }
      case "core/block":
      case "core/group": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            width={block.attributes.width}
            height={block.attributes.height}
            src={block.attributes.url}
            alt={block.attributes.alt || ""}
          />
        )
      }
      default: {
        console.log("uknown: ", block)
        return null
      }
    }
  })
}
