import Colors from '../constants/colors';

export default {
  formatResponse: (response) => {
    const colors = [
      Colors.blue,
      Colors.orange,
      Colors.indigo,
      Colors.red,
      Colors.green,
      Colors.purple,
    ];

    const tasks = [];
    let count = 0;

    for (const task of response) {
      tasks.push({
        id: task.task_id,
        title: task.title,
        product: task.label,
        assignee: 'Ciddarth',
        color: colors[count++],
        description: task.description,
        state: task.state,
        status: task.status,
      });
      if (count == colors.length) count = 0;
    }
    return tasks;
  },
};
