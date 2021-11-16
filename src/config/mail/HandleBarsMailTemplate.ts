/**
 Handlebars is a Template that allow us to use HTML tags with variables inside. With this, we can
 make the email page more interactive
 */
import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

/**
 We are unable to know what kind of variables will be in the email reset form, neither how many. We dont know
 if they will have 1, 2, 3, 10 variables and if this variables are string type or number type... Thats why
 we create a interface that will retrieve a key (the syntax is like this above, i dont know why hahaha) saying
 "hey, whatever type of variables, i can read". The variable "variables" below implements this interface.
 */

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}
export default class HandleBarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
