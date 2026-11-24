# Scheduled maintenance

The included shell script runs only deterministic operations: source status, index generation, and lint. It does not call a model or change raw source files.

For systemd:
1. Copy the service and timer files to the user unit directory.
2. Edit the service ODINOS_BRAIN_HOME and ExecStart paths for the actual host.
3. Run systemctl --user daemon-reload.
4. Enable only after a manual run succeeds: systemctl --user enable --now odin-brain-maintenance.timer.
5. Inspect with systemctl --user list-timers and journalctl --user -u odin-brain-maintenance.service.

The example is intentionally not enabled automatically. Scheduled LLM ingest requires a separate trusted agent-host adapter and explicit resource/access controls. Never schedule a generic shell command that can read arbitrary host files or publish changes.
