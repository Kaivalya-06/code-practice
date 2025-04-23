nano push-daily.sh
#!/bin/bash
cd /c/Users/KAIVALYA\ DESHMUKH/code-practice || exit
git add .
git commit -m "Daily update: $(date '+%Y-%m-%d')" || echo "No changes to commit"
git push origin main
echo "Pushed on $(date)" >> push-log.txt
