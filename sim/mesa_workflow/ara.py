"""Workflow entropy metric compatibility shim.

ARA is not a core persona or voice. The expansion role is Angelica.
Use workflow_entropy for new imports; this module remains only to avoid
breaking older imports while they are migrated.
"""
from .workflow_entropy import measure, shannon

__all__ = ["measure", "shannon"]
