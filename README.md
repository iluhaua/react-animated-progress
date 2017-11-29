## Skill Map

Usage:
Make inport:
```
import SkillMap from "../../components/SkillMap/SkillMap.js";
```

```
<div>
  <SkillMap currentStage={1} progress={10} whoseTurn="Zain Amro" speaker="David" upnext="Laura"/>
</div>
```
Properties:
currentStage - stage from 1 to 8
  if using progress instead then omit this property;
progress - progress in percents;
whoseTurn - text to display in left top corner;
speaker - name to display for "Speaker" field;
upnext - name to display for "Up Next" field.
