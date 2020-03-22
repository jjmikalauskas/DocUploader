using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UploaderApp.API.Helpers;
using UploaderApp.API.Models;

namespace UploaderApp.API.Data
{
    public interface ISendLinkRepository
    {
         void Add<T>(T entity) where T : class;
         Task<bool> SaveAll();
         
         Task<DocumentInfo> GetEmailLink(Guid guid, string guidString);
         Task<PagedList<DocumentInfo>> GetReport(ReportParams rptParams, string filter = "");

        //  Task<bool> ClickOnLink(Guid guid);

        //  Task<bool> ViewDocument(Guid guid);

        //  Task<bool> AgreeToDocument(Guid guid);
         
    }
}