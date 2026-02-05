import { Button } from '../packages/react/src/components/Button'
import { figma } from '@figma/code-connect'

figma.connect(
  Button,
  'https://www.figma.com/design/ULNj7mYUjmwHMTjjVkcVM6/Task-Manager---Sage?node-id=1-2594&m=dev',
  {
    props: {
      variant: figma.enum('Variant'),
      size: figma.enum('Size'),
      disabled: figma.boolean('Disabled'),
    },
    example: (props) => (
      <Button {...props}>Click me</Button>
    ),
  }
)