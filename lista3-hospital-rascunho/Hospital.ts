import { Medico } from "./Medico";
import { Paciente } from "./Paciente";
import { Consulta } from "./Consulta";
import {Receita} from "./Receita";


let juniorjuca = new Paciente(1, "Junior Juca", "123456789", "junin@gmail.com", ["Alergia ao pó"], ["Dor de cabeça", "Febre"]);
let AnaMaria = new Paciente(2, "Ana Maria", "987654321", "anamaria@gmail.com", ["Alergia à Abelha"], ["Dor no Corpo", "Febre"]);
let MariaJoana = new Paciente(3, "Maria Joana", "123456789", "mariajoana@gmail.com", [], ["Dor de Barriga"]);
let RenanSilva = new Paciente(4, "Renan Silva", "123456789", "renansilva@gmail.com", ["Alergia à Amendoim"], ["Dor nas Costas", "Manchas Vermelhas ao redor do corpo"]);

let drHouse = new Medico(1, "House Casa", "123456789", "drcasa@gmail.com", 123456, "Urologista");
let drGrey = new Medico(2, "Grey Cinza", "987654321", "drgrey@gmail.com", 654321, "Cardiologista");
let drBrown = new Medico(3, "Brown Marrom", "123456789", "drbrown@gmail.com", 123456, "Dermatologista");

let consulta = new Consulta(new Date(2024-12-2), drHouse, juniorjuca);
let receita = new Receita(consulta, [])//receita é gerada
receita.remedios = ["remedio1", "remedio2"];//posso mudar
receita.assinar();

consulta.finalizarConsulta()//consulta nao precisa necessariamente de receita para ser finalizada










