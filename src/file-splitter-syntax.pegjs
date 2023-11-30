{
  const reduce_sentences = function(sentences) {
    const output = [];
    for(let index=0; index<sentences.length; index++) {
      const sentence = sentences[index];
      if(typeof sentence === "object") {
      	output.push({ file: sentence.file, contents: "" });
      } else if(typeof sentence === "string") {
      	if(output.length === 0) {
          output.push({ file: "default.txt" });
        }
      	output[output.length-1].contents += sentence;
      }
    }
    return output;
  };
}
Language = sentences:Sentence* { return reduce_sentences(sentences) }
Sentence = Token / No_token
Token = "<##" file:No_close_tag "##>" EOL { return { file } }
No_close_tag = (!("##>").)* { return text().trim() }
No_token = (!(Token/EOF).)+ { return text() }
EOF = !.
EOL = "\r\n" / "\n" / EOF