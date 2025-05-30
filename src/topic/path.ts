import { StatusError } from "../core/status.error";
import { Stack } from "../core/stack";
import { Queue } from "../core/queue";
import { Topic } from "./topic";
import { TopicTree } from "./topic-tree";

export class Path {
    private stack: Stack<TopicTree>;
    private queue: Queue<TopicTree>;
    private curr: TopicTree;

    constructor(private from: Topic, private to: Topic, private tree: TopicTree) {
        this.stack = new Stack<TopicTree>();
        this.queue = new Queue<TopicTree>();
    }

    get(): Topic[] {
        this.curr = this.tree;
        if (this.curr.id === this.from.id) {
            this.stack.push(this.curr)
        } else {
            this.stack.push(this.curr)
            this._findNext(this.from);
        }
        if (this.stack.size() === 0) {
            throw new StatusError(500, `Data Inconsistency: Topic not found ${this.from.name}`);
        }
        var fromPath = this._stackToList();


        this.curr = this.tree;

        if (this.curr.id === this.to.id) {
            this.stack.push(this.curr)
        } else {
            this.stack.push(this.curr)
            this._findNext(this.to)
        }
        if (this.stack.size() === 0) {
            throw new StatusError(500, `Data Inconsistency: Topic not found  ${this.to.name}`);
        }
        var toPath = this._stackToList();

        var intersection = this._intersectionPoint(fromPath, toPath);

        var temp = fromPath.findIndex(t => t.id === intersection.id);

        var _f = fromPath.slice(temp + 1)

        temp = toPath.findIndex(t => t.id === intersection.id)
        var _t = toPath.slice(temp + 1);


        if (_f.length > _t.length) {
            var s = new Stack([..._f]);
            _f = [];
            while (!s.isEmpty())
                _f.push(s.pop());
        }
        return [..._f, intersection, ..._t].map(p => ({...p, children: undefined}));

    }
    private _intersectionPoint(arr1: TopicTree[], arr2: TopicTree[]): TopicTree {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        var intersection: TopicTree;

        for (const e of set1) {
            if (set2.has(e)) {
                intersection = e;
            }
        }

        return intersection;
    }

    private _stackToList(): TopicTree[] {
        var temp = new Stack<TopicTree>();
        while (!this.stack.isEmpty()) {
            temp.push(this.stack.pop());
        }

        var path = [];
        while (!temp.isEmpty()) {
            path.push(temp.pop());
        }

        return path;
    }

    private _findNext(ref: Topic): Topic {
        var foundLast = this.curr.children.find(t => t.id === ref.id);
        if (foundLast) { // check for the path end

            this.stack.push(foundLast);
            return foundLast;
        }

        this.queue.enqueueAll(this.curr.children);

        if (this.queue.size() === 0) {
            return null;
        }

        this.curr = this.queue.dequeue();
        this.stack.push(this.curr);

        return this._findNext(ref);
    }

}