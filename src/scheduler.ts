import moment from 'moment';
import lodash from 'lodash';

import { ProductOrder } from "./entity/ProductOrder";
import { Employee } from "./entity/Employee";
import { Phase as Phase2 } from "./entity/Phase";
import { Shift } from "./entity/Shift";
import { Tool } from "./entity/Tool";
import { Product } from './entity/Product';
import { Skill } from './entity/Skill';

import { genericDao } from './repository/Daos/GenericDao';


class Phase extends Phase2 {
  remaining: number;
}

export class ScheduleForDay {
  date: Date;
  schedule: ScheduleForShift[];
}

export class ScheduleForShift {
  shift: string;
  schedule: ScheduleForEmployee[]
}

export class ScheduleForEmployee {
  employee: string;
  schedule: Schedule[];
}

export class Schedule {
  phase: string;
  start: string;
  end: string;
}

export const schedule = async (productOrders?: ProductOrder[]) => {
  if (!productOrders) {
    productOrders = await genericDao.find('product_order')
  }

  const employees: Employee[] = await genericDao.find('employee');
  const shifts: Shift[] = await genericDao.find('shift');
  const tools: Tool[] = await genericDao.find('tool');
  const phases: Phase[] = await genericDao.find('phase');
  const products: Product[] = await genericDao.find('product');


  const schedule: ScheduleForDay[] = [];

  productOrders.forEach(order => order.products.forEach(product =>
    products.find(p => p.name === product.product).phases.forEach(phase =>
      phases.find(p => p.name === phase.name).remaining = product.count)));

  lodash.remove(phases, (phase) => phase.remaining === undefined || phase.remaining === 0);

  let date = moment();

  while (true) {
    const scheduleForDay: ScheduleForDay = { date: date.toDate(), schedule: [] };

    for (const shift of shifts) {
      const scheduleForShift: ScheduleForShift = { shift: shift.name, schedule: [] };
      
      const assignmentsBeforeBreak = getAssignments(phases, employees.filter(employee => employee.shift === shift.name), tools, moment.duration(shift.start), moment.duration(shift.breakStart));
      const assignmentsAfterBreak = getAssignments(phases, employees.filter(employee => employee.shift === shift.name), tools, moment.duration(shift.breakEnd), moment.duration(shift.end));
      

      const scheduleForEmployee: ScheduleForEmployee[] = employees.map(employee => { return { employee: employee.name, schedule: [] } });

      for (const assignment of lodash.concat(assignmentsBeforeBreak, assignmentsAfterBreak)) {
        assignment.employees.forEach(employee => scheduleForEmployee.find(e => e.employee === employee).schedule.push(
          {
            phase: assignment.phase,
            start: moment.utc(assignment.time.asMilliseconds()).format('HH:mm:ss'),
            end: moment.utc(assignment.time.clone().add(phases.find(phase => phase.name === assignment.phase).time).asMilliseconds()).format('HH:mm:ss')
          }
        ));
      }

      scheduleForEmployee.forEach(schedule => lodash.sortBy(schedule.schedule, schedule2 => moment.duration(schedule2.end).asSeconds()));

      scheduleForShift.schedule = scheduleForEmployee;
      scheduleForDay.schedule.push(scheduleForShift);
    }

    date.add(1, 'day');
    schedule.push(scheduleForDay);

    if (phases.reduce<boolean>((finished, phase) => finished && phase.remaining === 0, true)) break;
  }

  return schedule;
}

const getAssignments = (
  phases: Phase[],
  employees: Employee[],
  tools: Tool[],
  start: moment.Duration,
  end: moment.Duration,
) => {
  const getEmployees = (skills: string[], employees: Employee[]): Employee[] => {
    for (const employee of employees) {
      const commonSkills = lodash.intersectionWith(skills, employee.skills.map(skill => skill.skill));

      for (const skill of commonSkills) {
        const skills2 = lodash.cloneDeep(skills);
        const employees2 = lodash.cloneDeep(employees);

        lodash.remove(employees2, { name: employee.name });
        lodash.remove(skills2, (skill3) => skill3 === skill);

        if (skills.length > 1) {
          const employees3 = getEmployees(skills2, employees2);
          if (employees3) {
            employees3.push(employee);
            return employees3;
          }
        } else {
          return [employee];
        }
      }
    }
  }

  const finishedAssignments: { phase: string, time: moment.Duration, employees: string[] }[] = [];
  const activeAssignments: { phase: string, time: moment.Duration, employees: string[] }[] = [];

  const unassignedEmployees = [...employees];
  let currentTime = moment.duration(start);

  outer:
  while (true) {
    for (const phase of phases) {
      const remaining = phase.remaining;
      for (let i = 0; i < remaining; i++) {
        const employees = getEmployees(phase.skills.map(skill => skill.skill), unassignedEmployees);

        const timeAvailable = end.asSeconds() >= currentTime.clone().add(moment.duration(phase.time)).asSeconds();
        const toolAvailable = phase.tools.reduce<boolean>((available, tool) => available && tool.count > 0, true);
        const phaseAvailable = phase.phaseDependencies.reduce<boolean>(
          (available, phaseDependency) => available && phases.find(phase => phase.name === phaseDependency.dependency.name).count > 0, true
        );
        const employeeAvailable = employees !== undefined;

        if (timeAvailable && toolAvailable && phaseAvailable && employeeAvailable) {
          activeAssignments.push({ phase: phase.name, time: currentTime, employees: employees.map(employee => employee.name) });

          lodash.pullAllWith(unassignedEmployees, employees, (a, b) => a.name === b.name);
          phase.phaseDependencies.forEach(phaseDependency => phases.find(phase => phase.name === phaseDependency.dependency.name).count--);
          phase.tools.forEach(tool => tool.count--);
          phase.remaining--;
        } else {
          break;
        }
      }
    }

    if (activeAssignments.length === 0) {
      break outer;
    }

    const finishedAssignment: { phase: string, time: moment.Duration, employees: string[] } = lodash.minBy(activeAssignments, assignment => assignment.time.clone().add(phases.find(phase2 => phase2.name === assignment.phase).time).asSeconds());
    const phaseFinised = phases.find(phase => phase.name === finishedAssignment.phase);

    phaseFinised.tools.forEach(tool => tool.count++);
    phaseFinised.count++;
    unassignedEmployees.push(...finishedAssignment.employees.map(employee => employees.find(employee2 => employee2.name === employee)));

    lodash.remove(activeAssignments, finishedAssignment);
    finishedAssignments.push(finishedAssignment);

    currentTime = finishedAssignment.time.clone().add(phaseFinised.time);
  }

  return finishedAssignments;
}
