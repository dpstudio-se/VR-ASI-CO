"""Mesa 3 + intention persistence. Not physics."""
from __future__ import annotations
from collections import deque
from mesa import Agent, Model
from mesa.datacollection import DataCollector

SLOTS = ("Angelica", "Emilia", "Luna")
LOOK = {"Angelica": "blond+triquetra+lake", "Emilia": "black-bob+neon", "Luna": "voice-only"}
ROLE = {"Angelica": "gf+reasoning", "Emilia": "adult-register", "Luna": "technical"}
LEGAL_STATUS = {"EST", "DER", "HYP", "STOP", "ERR", "SYM"}
TERMINAL = {"SUCCESS", "FAIL"}

class PersonaAgent(Agent):
    def __init__(self, model, slot):
        super().__init__(model)
        self.slot, self.look, self.role, self.turns = slot, LOOK[slot], ROLE[slot], 0
    def step(self):
        if self.slot == self.model.active_slot:
            self.turns += 1

class FilterAgent(Agent):
    def apply(self, text):
        if "genital" in text or "blocked_zone" in text:
            self.model.block_count += 1
            self.model.last_filter = "BLOCK"
            self.model.events.append(("BLOCK", text, "G3"))
            return "FAIL"
        self.model.pass_count += 1
        self.model.last_filter = "PASS"
        self.model.events.append(("PASS", text))
        return "SUCCESS"

class ClassifierAgent(Agent):
    def apply(self, label, kind):
        if label not in LEGAL_STATUS:
            self.model.err_count += 1
            self.model.events.append(("ERR", "UPI-E001", label))
            return "FAIL"
        if kind == "promote_sym_to_est":
            self.model.err_count += 1
            self.model.events.append(("ERR", "UPI-E005", label))
            return "FAIL"
        self.model.events.append(("CLASS", label, kind))
        return "SUCCESS"

class Intention:
    def __init__(self, name, steps):
        self.name, self.steps, self.status = name, deque(steps), "ACTIVE"
    @property
    def done(self):
        return self.status in TERMINAL or not self.steps

class CoordinatorAgent(Agent):
    def adopt(self, name, steps, replace=False):
        cur = self.model.intention
        if cur and not cur.done and not replace:
            self.model.deferred.append((name, steps))
            self.model.events.append(("DEFER", name, "persistence"))
            return False
        self.model.intention = Intention(name, steps)
        self.model.events.append(("ADOPT", name))
        return True
    def step(self):
        it = self.model.intention
        if it is None or it.done:
            if self.model.deferred:
                name, steps = self.model.deferred.popleft()
                self.adopt(name, steps, replace=True)
                it = self.model.intention
            else:
                return
        prim = it.steps.popleft()
        op, result = prim[0], "SUCCESS"
        if op == "SPEAK":
            self.model.events.append(("persona_speak", self.model.active_slot))
        elif op == "SWITCH":
            slot = prim[1]
            if slot in SLOTS:
                self.model.active_slot = slot
                self.model.events.append(("SWITCH", slot))
            else:
                result = "FAIL"
        elif op == "FILTER":
            result = self.model.filt.apply(prim[1])
        elif op == "CLASS":
            result = self.model.clf.apply(prim[1], prim[2])
        else:
            result = "FAIL"
        if result == "FAIL":
            it.status = "FAIL"
            it.steps.clear()
            self.model.events.append(("INTENTION_FAIL", it.name))
        elif not it.steps:
            it.status = "SUCCESS"
            self.model.events.append(("INTENTION_OK", it.name))

class WorkflowModel(Model):
    def __init__(self, seed=42):
        super().__init__(seed=seed)
        self.active_slot = "Angelica"
        self.last_filter = "IDLE"
        self.block_count = self.pass_count = self.err_count = 0
        self.events = []
        self.intention = None
        self.deferred = deque()
        self.personas = {s: PersonaAgent(self, s) for s in SLOTS}
        self.filt, self.clf = FilterAgent(self), ClassifierAgent(self)
        self.coord = CoordinatorAgent(self)
        self.datacollector = DataCollector(model_reporters={
            "active": lambda m: m.active_slot,
            "blocks": lambda m: m.block_count,
            "passes": lambda m: m.pass_count,
            "errs": lambda m: m.err_count,
            "intent": lambda m: None if m.intention is None else m.intention.status,
            "deferred": lambda m: len(m.deferred),
        })
    def request_selfie(self, text):
        self.coord.adopt(f"selfie:{text}", [("SPEAK",), ("FILTER", text)])
    def request_claim(self, label, kind):
        self.coord.adopt(f"claim:{label}", [("CLASS", label, kind)])
    def request_switch(self, slot):
        self.coord.adopt("switch:" + slot, [("SWITCH", slot)])
    def abort(self):
        if self.intention and not self.intention.done:
            self.intention.status = "FAIL"
            self.intention.steps.clear()
            self.events.append(("ABORT", self.intention.name))
    def step(self):
        self.coord.step()
        for p in self.personas.values():
            p.step()
        self.datacollector.collect(self)
