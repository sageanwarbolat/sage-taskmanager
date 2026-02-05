import { figma } from '@figma/code-connect'

figma.connect(
  'Task Item Component',
  'https://www.figma.com/design/ULNj7mYUjmwHMTjjVkcVM6/Task-Manager---Sage?node-id=1-2595&m=dev',
  {
    description: 'A single task item with checkbox, text, and delete button',
    source: 'https://github.com/sageanwarbolat/sage-taskmanager/blob/main/script.js#L240',
    example: (props) => (
      `<li class="task-item">
        <input type="checkbox" class="task-checkbox" />
        <span class="task-text">Sample task</span>
        <button class="delete-button">×</button>
      </li>`
    ),
  }
)