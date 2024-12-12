import Context from '../../src/domain/context/Context';
import AssistantToolCalls from '../../src/domain/context/AssistantToolCalls';
import FunctionResult from '../../src/domain/context/FunctionResult';
import UserInteraction from '../../src/domain/spi/user/UserInteraction';
import {beforeEach, describe, expect, it} from "bun:test";
import FunctionCall from "src/domain/function/FunctionCall.ts";

class MockUserInteraction implements UserInteraction {
  print(_message: any): void {
  }
}

describe('Context', () => {
  let context: Context;

  beforeEach(() => {
    context = new Context(new MockUserInteraction());
  });

  it('should remove nothing when there is no previous run test function call', () => {
    const normalCall = new AssistantToolCalls([
      new FunctionCall('1', 'read_file', {path: "./src/UserChat.ts"}),
      new FunctionCall('2', 'read_file', {path: "./src/Context.ts"}),
      new FunctionCall('3', 'read_file', {path: "./src/ContextFactory.ts"})
    ]);
    const normalFunctionResult1 = new FunctionResult('1', 'class UserChat {}');
    const normalFunctionResult2 = new FunctionResult('2', 'class Context {}');
    const normalFunctionResult3 = new FunctionResult('3', 'class ContextFactory {}');

    context.push(normalCall);
    context.push(normalFunctionResult1);
    context.push(normalFunctionResult2);
    context.push(normalFunctionResult3);

    expect(context.conversations).toHaveLength(4);

    const newTestCall = new AssistantToolCalls([new FunctionCall('2', 'test', {})]);
    context.push(newTestCall);

    expect(context.conversations).toHaveLength(5);
    expect(context.conversations).toContain(normalCall);
    expect(context.conversations).toContain(normalFunctionResult1);
    expect(context.conversations).toContain(normalFunctionResult2);
    expect(context.conversations).toContain(normalFunctionResult3);
    expect(context.conversations).toContain(newTestCall);
  });

  it('should remove nothing when an AssistantToolCalls with no test FunctionCall is added', () => {
    const testCall = new AssistantToolCalls([new FunctionCall('1', 'test', {})]);
    const testFunctionResult = new FunctionResult('1', "Test OK");
    const normalCall = new AssistantToolCalls([
      new FunctionCall('2', 'read_file', {path: "./src/UserChat.ts"}),
      new FunctionCall('3', 'read_file', {path: "./src/Context.ts"}),
      new FunctionCall('4', 'read_file', {path: "./src/ContextFactory.ts"})
    ]);

    context.push(testCall);
    context.push(testFunctionResult);

    expect(context.conversations).toHaveLength(2);

    context.push(normalCall);

    expect(context.conversations).toHaveLength(3);
    expect(context.conversations).toContain(testCall);
    expect(context.conversations).toContain(testFunctionResult);
    expect(context.conversations).toContain(normalCall);
  });

  it('should remove outdated test calls and their results', () => {
    const testCall1 = new AssistantToolCalls([new FunctionCall('1', 'test', {})]);
    const functionResult1 = new FunctionResult('1', "Test OK");
    const unrelatedFunctionResult = new FunctionResult('2', 'I ask something');

    context.push(testCall1);
    context.push(functionResult1);
    context.push(unrelatedFunctionResult);

    expect(context.conversations).toHaveLength(3);

    const newTestCall = new AssistantToolCalls([new FunctionCall('2', 'test', {})]);
    context.push(newTestCall);

    expect(context.conversations).toHaveLength(2);
    expect(context.conversations).not.toContain(functionResult1);
    expect(context.conversations).not.toContain(testCall1);
    expect(context.conversations).toContain(unrelatedFunctionResult);
    expect(context.conversations).toContain(newTestCall);
  });
});
