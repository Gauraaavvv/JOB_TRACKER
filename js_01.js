import { applications } from "./data.js"

export function countByStatus (applications, status) {
    const result = applications.filter((apl) => { 
        return apl.status === status
    }
    )
    return result.length
}

export function getAverageSalary(applications){
    if (applications.length === 0)
        return 0;
    let total = 0
    applications.forEach(apl => {
        total = total + apl.salary
    });
    return total/applications.length
}

export function getHighestSalaryApplication(applications){
    if(applications.length === 0)
        return null
    let highest = applications[0]
    applications.forEach( apl => {
        if(apl.salary > highest.salary)
            highest = apl
    })
    return highest
}

export function filterApplications(applications, status, minSalary) {
  return applications.filter((apl) => {
    const statusMatch = !status || apl.status === status
    const salaryMatch = minSalary == null || apl.salary >= minSalary
    return statusMatch && salaryMatch
  }
  )
}

export function removeApplication(applications,id){
    const updatedApplication = applications.filter(apl => apl.id !== id)
    return updatedApplication
}

export function getApplicationById(applications, id){
    return applications.find((apl) => apl.id === id)
}

export function updateApplication(applications, id, changes){
    const application = applications.find((apl) => apl.id === id)
    if(!application)
        return null;
    const updatedApplication = {...application,...changes}
    return updatedApplication
}

export function searchApplications(applications, companyName){
    const search = companyName.trim().toLowerCase()
    if(!search)
        return applications
    else
        return applications.filter(apl => {
            const company = apl.company.trim().toLowerCase()
            return company.includes(search)
        })
}

export function countByCompany(applications, companyName){
    const search = companyName.trim().toLowerCase()
    if(!search) return 0
    return applications.filter(apl => apl.company.toLowerCase().includes(search)).length
}

export function getOfferRate(applications){
    if(applications.length === 0)
        return 0
    return applications.filter(apl => apl.status === "offer").length / applications.length * 100
}

export function getApplicationsByDateRange(applications, startDate, endDate){
    if(!startDate || !endDate) return []
   return applications.filter((apl) => new Date(apl.date) >= new Date(startDate) && new Date(apl.date) <= new Date(endDate)
)} 

export function getRecentApplications(applications, limit){
    const sortedApplication = applications.slice().sort((a,b) => new Date(b.date) - new Date(a.date)
    )
    return sortedApplication.slice(0,limit)
}
console.log(
    getApplicationsByDateRange(
        applications,
        "2026-10-12",
        "2026-10-27"
    )
);
/*console.log(getOfferRate(applications))
console.log(searchApplications(applications, "amazon"))
console.log(updateApplicationStatus(applications, 1, "done"))
console.log(getApplicationById(applications, 2))
console.log(removeApplication(applications,3))
console.log(filterApplications(applications, "interview", 1200000));
console.log(getHighestSalary(applications))
console.log(getAverageSalary(applications));
console.log(countByStatus(applications, "applied"));    // 2
console.log(countByStatus(applications, "interview"));  // 2
console.log(countByStatus(applications, "rejected"));   // 1
console.log(countByStatus(applications, "offer")); */   // 0  
