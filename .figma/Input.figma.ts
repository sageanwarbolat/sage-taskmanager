import { TextInput } from '../packages/react/src/components/TextInput'
import { figma } from '@figma/code-connect'

figma.connect(
  TextInput,
  'https://www.figma.com/design/ULNj7mYUjmwHMTjjVkcVM6/Task-Manager---Sage?node-id=1-1986&m=dev',
  {
    props: {
      placeholder: figma.string('Placeholder'),
      disabled: figma.boolean('Disabled'),
      error: figma.boolean('Error'),
    },
    example: (props) => (
      <TextInput {...props} />
    ),
  }
)