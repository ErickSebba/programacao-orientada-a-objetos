import { Paciente } from './Paciente';
import { Medico } from './Medico';
import { Consulta } from './Consulta';
import { Receita } from './Receita';

let juniorjuca: Paciente;
let AnaMaria: Paciente;
let MariaJoana: Paciente;
let RenanSilva: Paciente;
let drHouse: Medico;
let drGrey: Medico;
let drBrown: Medico;
let consulta: Consulta;

beforeAll(() => {
    jest.useFakeTimers({advanceTimers: true, now : new Date(2024, 10, 13)});
    
    juniorjuca = new Paciente(1, "Junior Juca", "123456789", "junin@gmail.com", ["Alergia ao pó"], ["Dor de cabeça", "Febre"]);
    AnaMaria = new Paciente(2, "Ana Maria", "987654321", "anamaria@gmail.com", ["Alergia à Abelha"], ["Dor no Corpo", "Febre"]);
    MariaJoana = new Paciente(3, "Maria Joana", "123456789", "mariajoana@gmail.com", [], ["Dor de Barriga"]);
    RenanSilva = new Paciente(4, "Renan Silva", "123456789", "renansilva@gmail.com", ["Alergia à Amendoim"], ["Dor nas Costas", "Manchas Vermelhas ao redor do corpo"]);

    drHouse = new Medico(1, "Dr. House", "123456789", "drcasa@gmail.com", 123456, "Urologista");
    drGrey = new Medico(2, "Grey Cinza", "987654321", "drgrey@gmail.com", 654321, "Cardiologista");
    drBrown = new Medico(3, "Brown Marrom", "123456789", "drbrown@gmail.com", 234567, "Dermatologista");
    try{
        consulta = new Consulta(new Date(2024-12-2), drHouse);
    }catch(e){
        console.log(e.message);
    }
    //consulta = new Consulta(new Date(2025-12-2), drHouse);
});

describe('Casos teste', () => {

    test('Teste marcar consulta', () => {
        
        juniorjuca.marcarConsulta(consulta);
        
        
    });

});