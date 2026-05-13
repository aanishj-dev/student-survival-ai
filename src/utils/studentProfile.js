export function getStudentProfile() {
  return {
    name: localStorage.getItem("studentName") || "Student",
    city: localStorage.getItem("studentCity") || "the UK",
    university: localStorage.getItem("studentUniversity") || "their university",
    budget: localStorage.getItem("studentBudget") || "not provided",
    goal: localStorage.getItem("studentGoal") || "student success",
  }
}