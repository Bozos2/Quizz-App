export function groupQuestions(questions, groupSize) {
  const grouped = [];
  let currentGroup = [];
  let groupId = 1;

  for (let i = 0; i < questions.length; i++) {
    currentGroup.push(questions[i]);

    if (currentGroup.length === groupSize) {
      grouped.push({
        id: groupId,
        questions: currentGroup,
      });
      currentGroup = [];
      groupId++;
    }
  }

  if (currentGroup.length > 0) {
    grouped.push({
      id: groupId,
      questions: currentGroup,
    });
  }

  return grouped;
}
