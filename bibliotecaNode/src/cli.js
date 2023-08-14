/*criando um ponto de contato entre nossa biblioteca e o terminal de onde virão as informações.*/
/*criaremos o código que fará a manipulação das informações que passaremos pela linha de comando e as levará para o restante da aplicação.*/ 

import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';



const caminho = process.argv;     /*process.argv, que representa esse objeto e valores de argumento. É assim que chamamos informações passadas da linha de comando para o programa.* */

function imprimeLista(valida, resultado, identificador = '') {
  
  if(valida){
    console.log(
      chalk.yellow('lista de links'),
      chalk.black.bgGreen(identificador),
      listaValidada(resultado));
  }else{
      console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
  }
}



async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida' ;

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log('arquivo ou diretório não existe');
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(argumentos[2]);
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho)
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
      imprimeLista(valida, lista, nomeDeArquivo)
    })
  }
}

processaTexto(caminho);