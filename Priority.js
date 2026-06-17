
const WEIGHTS = {
    Placement: 2,
    Result: 6,
    Event: 2
};
 function calculatePriority(notification){
    const weight = WEIGHTS[notification.type] || 0;
    const recent = new Date(notification.createdAt).getTime();
    return weight * 1000000 + recent;
 }
 async function getTop10Notifications() {
    try{
        const response = await fetch("http://4.224.186.213/evaluation-service/notifications",{
            method: "GET",
            headers:{
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcHJlZGR5Lm9vZmljaWFsQGdtYWlsLmNvbSIsImV4cCI6MTc4MTY3ODM0MiwiaWF0IjoxNzgxNjc3NDQyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzgyYjIwZTItMGNlMC00ZjQzLTg5MDEtMzJlZTc3ODMxNGZhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiayBwYXZhbmkgcmVkZHkiLCJzdWIiOiI1OGU2ZWU5Zi1kYzNlLTQyMTEtOTQwNS1kY2Y4NGJmODkwMTYifSwiZW1haWwiOiJrcHJlZGR5Lm9vZmljaWFsQGdtYWlsLmNvbSIsIm5hbWUiOiJrIHBhdmFuaSByZWRkeSIsInJvbGxObyI6InZ0dTI0NjQzIiwiYWNjZXNzQ29kZSI6Imp1RnBodiIsImNsaWVudElEIjoiNThlNmVlOWYtZGMzZS00MjExLTk0MDUtZGNmODRiZjg5MDE2IiwiY2xpZW50U2VjcmV0IjoiYmRyaFFCQ2ZmTXROdkRjbSJ9.C5cRWWEZRhy_H7CufeF4EKlY54In1ZsBGKOUqAAptRE"}`
            }
        });
        const notifications = await response.json();
        console.log(JSON.stringify(notifications, null, 2));
        return;
        const top10 = notifications.filter((n) => !n.isRead).sort((a, b) => calculatePriority(b) - calculatePriority(a)).slice(0, 10);
        console.log("\n TOP 10 PRIORITY NOTIFICATIONS \n");
        top10.forEach((n, index) => {
            console.log(`${index + 1}. ${n.ID} | ${n.Type} | ${n.Message} | ${n.Timestamp}`);
        });
    }catch (error){
        console.error("Error:" ,error.message);
    }
 }
 getTop10Notifications();