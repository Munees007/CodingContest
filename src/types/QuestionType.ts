type example = {
    input:string,
    output:string
  }
type content = {
      problem:string,
      input: string,
      output:string,
      example1:example,
      example2:example,
      answer:string
  }
export type questionType = {
    title: string,
    content: content
}
export type Level = {
    questions:questionType[],
    answeredData?:boolean[],
}

