//o Multer é um middleware responsavel por fazer upload de arquivos
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

/* o metodo resolve é pra pegar a URI do arquivo,os 2 pontinhos servem
pra voltar um nivel na arvore de arquivos. dirname seria o diretorio atual do arquivo upload,
ai eu volto um nivel pra pasta src, e volto mais um pra raiz. Na raiz que vai ter a pasta
uploads, onde de fato os arquivos vao ser adicionados

*/

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      //eu crio um hash pra compor o nome do arquivo, assim eu garanto que a chance de ter 2 arquivos com mesmo nomes seja quase impossivel

      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
