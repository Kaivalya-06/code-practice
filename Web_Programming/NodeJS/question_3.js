exports.isPrime = function(n)
{
    if(n==0 || n==1)
        return false;
    var count = 0;
    for(i=2;i<n;i++)
    {
        if(n%i == 0)
            count++;
    }
    if(count>2)
        return false;
    else
        return true;
}
exports.isFact = function(val)
{
    if(val < 0)
        return -1;
    var a = 1;
    for(let i=val;i>0;i--)
    {
        a = a*i;
    }
    return a;
}
exports.isPerfect = function(n)
{
    let sum = 0;
    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            sum += i;
        }
    }
    return sum === n;
}