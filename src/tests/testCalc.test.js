import { mount } from '@vue/test-utils';
import { it, expect } from '@jest/globals';
import Calc from '../App';

describe("Calculator input test", () => {

	it("Test operand1 input value", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('1');


		expect(wrapper.vm.operand1).toBe(1);
	})

	it("Test operand2 input value", () => {
		const wrapper = mount(Calc);
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('1');

		expect(wrapper.vm.operand2).toBe(1);
	})

	it("Test method sum", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('1');
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('1');

		const methodSum = wrapper.find('div[name="+"]');
		methodSum.trigger('click');

		expect(wrapper.vm.result).toBe(2);
	})

	it("Test method sub", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('3');
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('2');

		const methodSub = wrapper.find('div[name="-"]');
		methodSub.trigger('click');

		expect(wrapper.vm.result).toBe(1);
	})

	it("Test method multi", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('3');
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('2');

		const methodMulti = wrapper.find('div[name="*"]');
		methodMulti.trigger('click');

		expect(wrapper.vm.result).toBe(6);
	})

	it("Test method div", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('6');
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('2');

		const methodDiv = wrapper.find('div[name="/"]');
		methodDiv.trigger('click');

		expect(wrapper.vm.result).toBe(3);
	})

	it("Test method reset", () => {
		const wrapper = mount(Calc);
		const operand1 = wrapper.find('input[name=operand1]');
		operand1.setValue('');
		const operand2 = wrapper.find('input[name=operand2]');
		operand2.setValue('');

		const methodReset = wrapper.find('div[name="C"]');
		methodReset.trigger('click');

		expect(wrapper.vm.result).toBe('');
	})

})