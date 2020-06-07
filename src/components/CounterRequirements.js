/** @jsx jsx */
import { jsx } from 'theme-ui';

export default function CounterRequirements() {
  return (
    <div sx={{ mb: 5}}>
      <h1>Componente Contador</h1>
      <ul>
        <li>Valores inteiros maiores que zero.</li>
        <li>Desenvolvedor pode definir valor inicial ao usar o componente.</li>
        <li>Entrada de valor pelo usuário.</li>
        <li>Botões de incrementar, decrementar e reiniciar</li>
      </ul>
    </div>
  );
}
