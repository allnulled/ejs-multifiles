{
  const reduce_sentences = function(sentences) {
    const output = [];
    for(let index=0; index<sentences.length; index++) {
      const sentence = sentences[index];
      if(typeof sentence === "object") {
        const filetype = sentence.type;
        if(filetype === "file") {
      	  output.push({ type: "file", file: sentence.file, contents: "" });
        } else if(filetype === "folder") {
          output.push({ type: "folder", file: sentence.file, contents: "" });
        }
      } else if(typeof sentence === "string") {
      	if(output.length === 0) {
          output.push({ file: "default.txt", contents: "" });
        }
      	output[output.length-1].contents += sentence;
      }
    }
    return output;
  };
}
Language = sentences:Sentence* { return reduce_sentences(sentences) }
Sentence = Token_folder / Token / No_token
Token_folder = "<##" space* "mkdir" space+ file:No_close_tag "##>" space* { return { type: "folder", file } }
Token = "<##" file:No_close_tag "##>" EOL { return { type: "file", file } }
No_close_tag = (!("##>").)* { return text().trim() }
No_token = (!(Token/EOF).)+ { return text() }
EOF = !.
EOL = "\r\n" / "\n" / EOF
space = " " / "\t"